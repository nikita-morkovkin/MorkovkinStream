import { MAX_FILE_SIZE } from '@/shared/constants/max-file-size.constant';
import { z } from 'zod';

export const uploadFileSchema = z.object({
  file: z
    .union([
      z.instanceof(File).refine(file => file.size <= MAX_FILE_SIZE),
      z.string().transform(value => (value === '' ? undefined : value)),
    ])
    .optional(),
});

export type TypeUploadFileSchema = z.infer<typeof uploadFileSchema>;
