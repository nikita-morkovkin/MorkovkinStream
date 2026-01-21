import { z } from 'zod';

export const changeInfoUserSchema = z.object({
  username: z
    .string()
    .min(3, '*Минимум 3 символа')
    .regex(/^[A-Za-z0-9_]+$/, '*Только латиница, цифры и нижнее подчеркивание'),
  displayName: z.string().min(3),
  bio: z.string().max(300),
});

export type TypeChangeInfoUserSchema = z.infer<typeof changeInfoUserSchema>;
