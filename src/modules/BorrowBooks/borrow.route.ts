import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { borrowControllers } from './borrow.controller';
import { borrowBookValidations } from './borrow.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(borrowBookValidations.createBorrowBookValidationSchema),
  borrowControllers.borrowBooks,
);

export const BorrowBookRoutes = router;
