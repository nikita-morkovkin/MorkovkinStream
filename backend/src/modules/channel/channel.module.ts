import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';

@Module({
  imports: [PrismaModule],
  providers: [ChannelResolver, ChannelService],
})
export class ChannelModule {}
