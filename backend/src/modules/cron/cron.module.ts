import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { MailModule } from '../libs/mail/mail.module';
import { TelegramModule } from '../libs/telegram/telegram.module';
import { CronService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, MailModule, TelegramModule],
  providers: [CronService],
})
export class CronModule {}
