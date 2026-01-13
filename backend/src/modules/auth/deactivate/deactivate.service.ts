import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'argon2';
import type { Request } from 'express';
import { TokenType, User } from 'generated/prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { MailService } from 'src/modules/libs/mail/mail.service';
import { TelegramService } from 'src/modules/libs/telegram/telegram.service';
import { generateToken } from 'src/shared/utils/generate-token.util';
import { getSessionMetadata } from 'src/shared/utils/session-metadata.util';
import { destroySession } from 'src/shared/utils/session.util';
import { DeactivateAccountInput } from './inputs/deactivate-account.input';

@Injectable()
export class DeactivateService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly telegramService: TelegramService,
  ) {}

  public async deactivate(
    req: Request,
    input: DeactivateAccountInput,
    user: User,
    userAgent: string,
  ) {
    const { pin, email, password } = input;

    if (user.email !== email) {
      throw new BadRequestException('Неверный email');
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new BadRequestException('Неверный пароль');
    }

    if (!pin) {
      await this.sendDeactivateToken(req, user, userAgent);

      return {
        message: 'Требуется код подтверждения',
      };
    }

    await this.validateDeactivateToken(req, pin);
    return { user };
  }

  private async validateDeactivateToken(req: Request, token: string) {
    let existingToken = await this.prismaService.token.findUnique({
      where: {
        token,
      },
    });

    if (!existingToken) {
      existingToken = await this.prismaService.token.findFirst({
        where: {
          id: token,
        },
      });
    }

    if (!existingToken || existingToken.type !== TokenType.DEACTIVATE_ACCOUNT) {
      throw new NotFoundException('Токен не найден');
    }

    const hasExpired = existingToken.expiresIn < new Date();

    if (hasExpired) {
      throw new BadRequestException('Токен истек');
    }

    if (!existingToken.userId) {
      throw new BadRequestException(
        'Неверный токен: нет связанного пользователя',
      );
    }

    await this.prismaService.user.update({
      where: {
        id: existingToken.userId,
      },
      data: {
        isDeactivated: true,
        deactivateAt: new Date(),
      },
    });

    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
      },
    });

    return await destroySession(req, this.configService);
  }

  public async sendDeactivateToken(
    req: Request,
    user: User,
    userAgent: string,
  ) {
    const deactivationToken = await generateToken(
      this.prismaService,
      user,
      TokenType.DEACTIVATE_ACCOUNT,
      false,
    );

    const metadata = getSessionMetadata(req, userAgent);

    await this.mailService.sendDeactivationEmail(
      user.email,
      metadata,
      deactivationToken.token,
    );

    if (
      deactivationToken.user?.notificationSettings?.telegramNotifications &&
      deactivationToken.user.telegramId
    ) {
      await this.telegramService.sendDeactivateToken(
        deactivationToken.user.telegramId,
        deactivationToken.token,
        metadata,
      );
    }

    return true;
  }
}
