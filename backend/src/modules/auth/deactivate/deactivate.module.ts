import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { DeactivateResolver } from './deactivate.resolver';
import { DeactivateService } from './deactivate.service';
import { TelegramModule } from 'src/modules/libs/telegram/telegram.module';

@Module({
  imports: [PrismaModule, ConfigModule, MailerModule, TelegramModule],
  providers: [DeactivateResolver, DeactivateService],
})
export class DeactivateModule {}
