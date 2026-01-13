import { ConfigService } from '@nestjs/config';
import type { TelegrafModuleOptions } from 'nestjs-telegraf';

export function getTelegramConfig(
  configService: ConfigService,
): TelegrafModuleOptions {
  return {
    token: configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'),
  };
}
