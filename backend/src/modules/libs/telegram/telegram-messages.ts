import type { User } from 'generated/prisma/client';
import type { SessionMetadata } from 'src/shared/types/session-metadata.types';

export const MESSAGES = {
  welcome: `⏩ <b>Добро пожаловать на платформу MorkovkinStream!</b>\n\nЧтобы получать уведомления и улучшить ваш опыт использования, пожалуйста, авторизуйтесь.`,
  authSuccess: '✅ <b>Успешная авторизация!</b>',
  invalidToken: '❌ <b>Невалидный токен или просроченный токен</b>',
  profile: (user: User, followersCount: number) =>
    `👤 <b>Профиль пользователя ${user.username}</b>\n\nПодписчиков: ${followersCount}`,
  follows: (user: User) =>
    `<a href="https://morkovkinstream.xyz/${user.username}">${user.username}</a>`,
  resetPassword: (token: string, metadata: SessionMetadata) =>
    `<b>🔒 Сброс пароля</b>\n\n` +
    `Вы запросили сброс пароля для вашей учетной записи на платформе <b>MorkovkinStream</b>.\n\n` +
    `Чтобы создать новый пароль, пожалуйста, перейдите по следующей ссылке:\n\n` +
    `<b><a href="https://morkovkinstream.xyz/account/recovery/${token}">Сбросить пароль</a></b>\n\n` +
    `🗓 <b>Дата запроса:</b> ${new Date().toLocaleDateString('ru-RU')} в ${new Date().toLocaleTimeString('ru-RU')}\n\n` +
    `💻 <b>Информация о запросе:</b>\n\n` +
    `🌍 <b>Расположение:</b> ${metadata.location.country}, ${metadata.location.city}\n` +
    `📱 <b>Операционная система:</b> ${metadata.device.os}\n` +
    `🌐 <b>Браузер:</b> ${metadata.device.browser}\n` +
    `🖥 <b>IP-адрес:</b> ${metadata.ip}\n\n` +
    `Если вы не делали этот запрос, просто проигнорируйте это сообщение.`,
  deactivateAccount: (token: string, metadata: SessionMetadata) =>
    `<b>🔒 Деактивация аккаунта</b>\n\n` +
    `Вы запросили деактивацию своей учетной записи на платформе <b>MorkovkinStream</b>.\n\n` +
    `Чтобы подтвердить деактивацию, пожалуйста, перейдите по следующей ссылке:\n\n` +
    `<b><a href="https://morkovkinstream.xyz/account/deactivate/${token}">Деактивировать аккаунт</a></b>\n\n` +
    `🗓 <b>Дата запроса:</b> ${new Date().toLocaleDateString('ru-RU')} в ${new Date().toLocaleTimeString('ru-RU')}\n\n` +
    `💻 <b>Информация о запросе:</b>\n\n` +
    `🌍 <b>Расположение:</b> ${metadata.location.country}, ${metadata.location.city}\n` +
    `📱 <b>Операционная система:</b> ${metadata.device.os}\n` +
    `🌐 <b>Браузер:</b> ${metadata.device.browser}\n` +
    `🖥 <b>IP-адрес:</b> ${metadata.ip}\n\n` +
    `Если вы не делали этот запрос, просто проигнорируйте это сообщение.`,
  accountDeleted: () =>
    `<b>🔒 Удаление аккаунта</b>\n\n` +
    `Ваш аккаунт был успешно удалён.\n\n` +
    `Если вы не делали этот запрос, пожалуйста, свяжитесь с поддержкой.`,
  streamStart: (channel: User) =>
    `<b>🚀 Стрим начался!</b>\n\n` +
    `Канал <a href="https://morkovkinstream.xyz/${channel.username}">${channel.username}</a> начал трансляцию.\n\n` +
    `Не пропустите!`,
  newFollowing: (follower: User, followersCount: number) =>
    `<b>🌟 Новый подписчик!</b>\n\n` +
    `На вас подписался пользователь: <a href="https://morkovkinstream.xyz/${follower.username}">${follower.username}</a>.\n\n` +
    `Теперь у вас ${followersCount} подписчиков!`,
};
