import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { MailModule } from '../libs/mail/mail.module';
import { CronService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, MailModule],
  providers: [CronService],
})
export class CronModule {}
