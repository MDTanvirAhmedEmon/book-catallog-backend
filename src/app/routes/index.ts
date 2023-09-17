import express from 'express';
import { authRouter } from '../modules/auth/auth.router';
import { userRouter } from '../modules/users/users.router';
import { categoryRouter } from '../modules/category/category.router';
import { bookRouter } from '../modules/book/book.router';
import { orderRouter } from '../modules/order/order.router';


const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: authRouter,
  },
  {
    path: "/users",
    routes: userRouter,
  },
  {
    path: "/categories",
    routes: categoryRouter,
  },
  {
    path: "/books",
    routes: bookRouter,
  },
  {
    path: "/orders",
    routes: orderRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
