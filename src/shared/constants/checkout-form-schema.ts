import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Soname must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z
    .string()
    .min(10, { message: 'Phone must be at least 10 characters' }),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters' }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
