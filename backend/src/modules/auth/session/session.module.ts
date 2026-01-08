import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { TotpModule } from '../totp/totp.module';
import { VerificationModule } from '../verification/verification.module';
import { SessionResolver } from './session.resolver';
import { SessionService } from './session.service';

@Module({
  imports: [PrismaModule, ConfigModule, VerificationModule, TotpModule],
  providers: [SessionResolver, SessionService],
})
export class SessionModule {}
