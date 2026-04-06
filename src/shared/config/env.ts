import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url('VITE_API_URL must be a valid URL'),
  VITE_APP_VERSION: z.string().optional().default('1.0.0'),
  MODE: z.enum(['development', 'production', 'test']).default('development'),
});

const result = envSchema.safeParse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION,
  MODE: import.meta.env.MODE,
});

if (!result.success) {
  console.error('Invalid Environment Variables:', result.error.format());
  throw new Error('Invalid environment variables. Please check your .env file.');
}

export const env = result.data;
