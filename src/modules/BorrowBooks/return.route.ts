import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { borrowControllers } from './borrow.controller';
import { borrowBookValidations } from './borrow.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(borrowBookValidations.returnBookValidationSchema),
  borrowControllers.returnBooks,
);

export const ReturnBookRoutes = router;
