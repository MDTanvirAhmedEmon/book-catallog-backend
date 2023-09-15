import express from 'express';
import { authRouter } from '../modules/auth/auth.router';
import { userRouter } from '../modules/users/users.router';
import { categoryRouter } from '../modules/category/category.router';


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
    path: "/category",
    routes: categoryRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
