import { z } from 'zod';

const createBorrowBookValidationSchema = z.object({
  body: z.object({
    bookId: z
      .string({
        required_error: 'Book Id is required',
        invalid_type_error: 'Book Id must be a string',
      })
      .trim(),
    memberId: z
      .string({
        required_error: 'Member Id is required',
        invalid_type_error: 'Member Id must be a string',
      })
      .trim(),
  }),
});

export const borrowBookValidations = {
  createBorrowBookValidationSchema,
};