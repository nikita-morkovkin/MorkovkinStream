import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z.email({ message: '*Введите корректную почту' }),
});

export type TypeResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
