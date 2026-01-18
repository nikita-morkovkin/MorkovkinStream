export const COOKIE_NAME = 'language';
export const languages = ['ru', 'en'] as const;
export const defaultLanguage = 'ru';

export type TypeLanguage = (typeof languages)[number];
