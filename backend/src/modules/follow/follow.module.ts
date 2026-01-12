import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';

@Module({
  imports: [PrismaModule],
  providers: [FollowResolver, FollowService],
})
export class FollowModule {}
