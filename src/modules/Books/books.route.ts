import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookControllers } from './books.controller';
import { bookValidations } from './books.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(bookValidations.createBookValidationSchema),
  bookControllers.createBooks,
);

// router.get('/:id', bookControllers.getSingleBook);

// router.put(
//   '/:id',
//   validateRequest(bookValidations.updateBookValidationSchema),
//   bookControllers.updateBook,
// );

// router.delete('/:id', bookControllers.deleteBook);

// router.get('/', bookControllers.getAllBooks);

export const BookRoutes = router;
