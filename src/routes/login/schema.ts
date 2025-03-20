import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(4).max(30),
});

export type LoginSchema = typeof loginSchema;
