import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must contain at least 8 characters')
  .max(128, 'Password must not exceed 128 characters');

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must contain at least 2 characters')
    .max(100, 'Name is too long'),

  email: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .max(255, 'Email is too long'),

  password: passwordSchema
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Enter a valid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
});

export function normalizeEmail(email) {
  return email.trim().toLowerCase();
}