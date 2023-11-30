import { z } from 'zod';

export const envSchema = z.object({
    PORT: z.string().default('3000'),
    LOG_LEVEL: z.enum(['debug', 'info', 'error']).default('debug'),
    NODE_ENV: z.enum(['development', 'testing', 'production']).default('development'),
});

export type IEnvVariables = z.infer<typeof envSchema>;