import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import type { User } from 'generated/prisma/client';
import { encode } from 'hi-base32';
import { TOTP } from 'otpauth';
import * as QRCode from 'qrcode';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { EnableTotpInput } from './inputs/enable-totp.input';

@Injectable()
export class TotpService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async generate(user: User) {
    const secret = encode(randomBytes(15)).replace(/=/g, '').substring(0, 24);

    const totp = new TOTP({
      issuer: 'MorkovkinStream',
      label: `${user.email}`,
      algorithm: 'SHA1',
      digits: 6,
      secret,
    });

    const otpauthUrl = totp.toString();
    const qrcode = await QRCode.toDataURL(otpauthUrl);

    return { qrcode, secret };
  }

  public async enableOtp(user: User, input: EnableTotpInput) {
    const { secret, pin } = input;

    const isValid = this.validateTotp(secret, pin, user.email);

    if (!isValid) {
      throw new BadRequestException('Неверный PIN-код');
    }

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        isTotpEnabled: true,
        totpSecret: secret,
      },
    });

    return true;
  }

  public async disableOtp(user: User) {
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        isTotpEnabled: false,
        totpSecret: null,
      },
    });

    return true;
  }

  public validateTotp(secret: string, token: string, email: string): boolean {
    if (!secret) {
      throw new BadRequestException('TOTP secret is not configured');
    }

    const totp = new TOTP({
      issuer: 'MorkovkinStream',
      label: `${email}`,
      algorithm: 'SHA1',
      digits: 6,
      secret,
    });

    const delta = totp.validate({ token });

    return delta !== null;
  }
}
