import { z } from 'zod';

export const formSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(4).max(30),
});

export type FormSchema = typeof formSchema;
