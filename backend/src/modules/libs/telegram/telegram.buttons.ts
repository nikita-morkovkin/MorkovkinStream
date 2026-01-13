import { Markup } from 'telegraf';

export const BUTTONS = {
  authSuccess: Markup.inlineKeyboard([
    [
      Markup.button.callback('Мои подписки', 'follows'),
      Markup.button.callback('Посмотреть профиль', 'me'),
    ],
    [Markup.button.url('🌐 На сайт', 'https://morkovkinstream.xyz')],
  ]),
  profile: Markup.inlineKeyboard([
    Markup.button.url(
      '⚙️ Настройки аккаунта',
      'https://morkovkinstream.xyz/dashboard/settings',
    ),
  ]),
};
