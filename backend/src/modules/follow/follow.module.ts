import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';
import { NotificationModule } from '../notification/notification.module';
import { TelegramModule } from '../libs/telegram/telegram.module';

@Module({
  imports: [PrismaModule, NotificationModule, TelegramModule],
  providers: [FollowResolver, FollowService],
})
export class FollowModule {}
