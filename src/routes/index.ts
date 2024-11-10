import { Router } from 'express';
import { BookRoutes } from '../modules/Books/books.route';
import { MemberRoutes } from '../modules/Members/members.route';
import { BorrowBookRoutes } from '../modules/BorrowBooks/borrow.route';
import { ReturnBookRoutes } from '../modules/BorrowBooks/return.route';

const router = Router();

const moduleRouter = [
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/members',
    route: MemberRoutes,
  },
  {
    path: '/borrow',
    route: BorrowBookRoutes,
  },
  {
    path: '/return',
    route: ReturnBookRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
