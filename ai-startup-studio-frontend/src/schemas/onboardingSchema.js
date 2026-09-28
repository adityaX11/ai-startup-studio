import { z } from 'zod';

export const onboardingSchema = z.object({
  founderName: z.string().min(2),
  role: z.string().min(2),
  experience: z.string().min(2),
  startupIdea: z.string().min(20),
  problem: z.string().min(20),
  targetCustomer: z.string().min(10),
  stage: z.string().min(2),
  industry: z.string().min(2),
  marketLocation: z.string().min(2),
  primaryGoal: z.string().min(10)
});
