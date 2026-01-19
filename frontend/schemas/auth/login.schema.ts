import { z } from 'zod';

export const loginSchema = z.object({
  login: z.email({ message: '*Введите корректную почту или логин' }),
  password: z.string().min(8, '*Минимум 8 символов'),
  pin: z.string().optional(),
});

export type TypeLoginSchema = z.infer<typeof loginSchema>;
