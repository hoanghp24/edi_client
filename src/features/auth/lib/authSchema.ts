import { z, ZodType } from 'zod';
import { User } from '@/shared/types';

export const UserSchema: ZodType<User> = z.lazy(() =>
  z.object({
    userName: z.string(),
    title: z.string().nullable(),
    email: z.string(),
    displayName: z.string().nullable(),
    manager: UserSchema.nullable(),
    reportTo: z.string().nullable(),
    department: z.string().nullable(),
    userGroup: z.string().nullable(),
    role: z.string().optional(),
    permissions: z.array(z.string()).optional(),
  })
);

export const AuthResponseSchema = z.object({
  User: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
  status: z.string(),
  message: z.string(),
  expiresDate: z.string(),
});

// Infer types from the schemas (optional, but keeps everything in sync)
export type ValidatedUser = z.infer<typeof UserSchema>;
export type ValidatedAuthResponse = z.infer<typeof AuthResponseSchema>;
