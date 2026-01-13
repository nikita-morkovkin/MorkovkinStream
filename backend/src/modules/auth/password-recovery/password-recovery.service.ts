import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'argon2';
import type { Request } from 'express';
import { TokenType } from 'generated/prisma/enums';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { MailService } from 'src/modules/libs/mail/mail.service';
import { TelegramService } from 'src/modules/libs/telegram/telegram.service';
import { generateToken } from 'src/shared/utils/generate-token.util';
import { getSessionMetadata } from 'src/shared/utils/session-metadata.util';
import { NewPasswordInput } from './inputs/new-password.input';
import { ResetPasswordInput } from './inputs/reset-password.input';

@Injectable()
export class PasswordRecoveryService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly telegramService: TelegramService,
  ) {}

  public async resetPassword(
    req: Request,
    input: ResetPasswordInput,
    userAgent: string,
  ) {
    const { email } = input;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        notificationSettings: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь с такой почтой не найден');
    }

    const resetToken = await generateToken(
      this.prismaService,
      user,
      TokenType.PASSWORD_RESET,
    );

    const metadata = getSessionMetadata(req, userAgent);

    try {
      await this.mailService.sendPasswordRecoveryToken(
        user.email,
        resetToken.token,
        metadata,
      );
    } catch {
      throw new BadRequestException(
        'Не удалось отправить письмо для сброса пароля',
      );
    }

    if (user.notificationSettings?.telegramNotifications && user.telegramId) {
      await this.telegramService.sendPasswordResetToken(
        user.telegramId,
        resetToken.token,
        metadata,
      );
    }

    return true;
  }

  public async newPassword(input: NewPasswordInput) {
    const { token, newPassword } = input;
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

    if (!existingToken || existingToken.type !== TokenType.PASSWORD_RESET) {
      throw new NotFoundException('Неверный токен');
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
        password: await hash(newPassword),
      },
    });

    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
}
