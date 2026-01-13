import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { getTelegramConfig } from 'src/core/config/telegraf.config';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { TelegramService } from './telegram.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: getTelegramConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
