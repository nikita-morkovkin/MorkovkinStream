import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'argon2';
import type { Request } from 'express';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';
import type { SessionMetadata } from 'src/shared/types/session-metadata.types';
import { getSessionMetadata } from 'src/shared/utils/session-metadata.util';
import { destroySession, saveSession } from 'src/shared/utils/session.util';
import { TotpService } from '../totp/totp.service';
import { VerificationService } from '../verification/verification.service';
import { LoginInput } from './inputs/login.input';

export interface SessionData {
  userId: string;
  createdAt: Date | string;
  metadata?: SessionMetadata;
}

export interface SessionWithId extends SessionData {
  id: string;
}

@Injectable()
export class SessionService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly verificationService: VerificationService,
    private readonly totpService: TotpService,
  ) {}

  public async findByUser(req: Request) {
    const userId = req.session.userId;

    if (!userId) {
      throw new NotFoundException('Unauthorized');
    }

    const keys = await this.redisService.keys('*');
    const userSessions: SessionWithId[] = [];

    for (const key of keys) {
      const sessionData = await this.redisService.get(key);

      if (sessionData) {
        try {
          const session = JSON.parse(sessionData) as SessionData;

          if (session.userId === userId) {
            userSessions.push({
              ...session,
              id: key.split(':')[1],
              metadata: session.metadata || {
                location: {
                  country: 'Unknown',
                  city: 'Unknown',
                  latitude: 0,
                  longitude: 0,
                },
                device: {
                  browser: 'Unknown',
                  os: 'Unknown',
                  type: 'Unknown',
                },
                ip: 'Unknown',
              },
            });
          }
        } catch (error) {
          console.error('Failed to parse session data:', error);
          continue;
        }
      }
    }

    userSessions.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return userSessions.filter(session => session.id !== req.session.id);
  }

  public findCurrent(req: Request) {
    if (!req.session.userId) {
      throw new NotFoundException('Session not found');
    }

    return {
      id: req.session.id,
      userId: req.session.userId,
      createdAt: req.session.createdAt || new Date(),
      metadata: req.session.metadata || {
        location: {
          country: 'Unknown',
          city: 'Unknown',
          latitude: 0,
          longitude: 0,
        },
        device: {
          browser: 'Unknown',
          os: 'Unknown',
          type: 'Unknown',
        },
        ip: 'Unknown',
      },
    };
  }

  public async login(req: Request, input: LoginInput, userAgent: string) {
    const { login, password, totpPin } = input;

    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: { equals: login } }, { email: { equals: login } }],
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    if (!user.isEmailVerified) {
      try {
        await this.verificationService.sendVerificationEmail(user);
        console.log('Verification email sent to user:', user.email);
      } catch {
        throw new UnauthorizedException(
          'Аккаунт не верифицирован, пожалуйста, проверьте вашу почту',
        );
      }
    }

    if (user.isTotpEnabled) {
      if (!totpPin) {
        throw new UnauthorizedException('Нужен код TOTP для входа');
      }

      if (!user.totpSecret) {
        throw new UnauthorizedException('TOTP не настроен для этого аккаунта');
      }

      const isValidTotp = this.totpService.validateTotp(
        user.totpSecret,
        totpPin,
        user.email,
      );

      if (!isValidTotp) {
        throw new UnauthorizedException('Неверный код TOTP');
      }
    }

    const metadata = getSessionMetadata(req, userAgent);

    return await saveSession(req, user, metadata);
  }

  public async logout(req: Request) {
    return await destroySession(req, this.configService);
  }

  public async clearSession(req: Request) {
    req.res?.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
    return await Promise.resolve(true);
  }

  public async remove(req: Request, id: string) {
    if (req.session.id === id) {
      throw new ConflictException('Невозможно удалить текущую сессию');
    }

    await this.redisService.del(
      `${this.configService.getOrThrow<string>('SESSION_FOLDER')}${id}`,
    );
  }
}
