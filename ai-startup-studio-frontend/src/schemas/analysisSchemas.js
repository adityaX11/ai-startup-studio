import { z } from 'zod';

export const competitorSchema = z.object({
  name: z.string().min(2, 'Competitor name is required'),
  website: z.string().min(2, 'Website is required'),
  pricing: z.string().min(1, 'Pricing is required'),
  targetCustomer: z.string().min(2, 'Target customer is required'),
  positioning: z.string().min(2, 'Positioning is required')
});

export const swotItemSchema = z.object({
  value: z.string().min(3, 'SWOT item must contain at least 3 characters')
});

export const validationChecklistSchema = z.object({
  label: z.string().min(3),
  completed: z.boolean()
});