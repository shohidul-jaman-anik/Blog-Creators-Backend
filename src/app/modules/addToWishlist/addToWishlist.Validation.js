const zod = require('zod');
const { categoryValues } = require('../forum/forum.constant');
const { z } = zod;

module.exports.addToWishlistValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Title is required' })
      .max(120, { message: 'Title is too large' }),
    img: z.string().refine(value => value.trim() !== '', {
      message: 'Forum image is required',
    }),
    category: z
      .string()
      // .nonempty()
      .refine(value => categoryValues.includes(value), {
        message: 'Invalid category',
      }),
    author: z.string(),
    blogId: z.string(),
    description: z.array(
      z.object({
        title: z.string(),
        content1: z.string(),
        content2: z.string(),
      }),
    ),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});
