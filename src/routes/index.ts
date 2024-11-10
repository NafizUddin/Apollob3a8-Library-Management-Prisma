import { Router } from 'express';
import { BookRoutes } from '../modules/Books/books.route';

const router = Router();

const moduleRouter = [
  {
    path: '/books',
    route: BookRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
