import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(4).max(30),
  password: z.string().min(6).max(30),
});
