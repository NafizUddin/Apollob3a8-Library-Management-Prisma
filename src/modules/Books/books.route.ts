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

router.get('/:bookId', bookControllers.getSingleBook);

router.put(
  '/:bookId',
  validateRequest(bookValidations.updateBookValidationSchema),
  bookControllers.updateBook,
);

router.delete('/:bookId', bookControllers.deleteBook);

router.get('/', bookControllers.getAllBooks);

export const BookRoutes = router;
