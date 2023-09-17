import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { orderController } from './order.controller';

const router = express.Router();

router.post('/create-order',auth(ENUM_USER_ROLE.CUSTOMER), orderController.createOrder);
router.get('/',auth(ENUM_USER_ROLE.ADMIN), orderController.getAllOrders);
router.get('/customer-order',auth(ENUM_USER_ROLE.CUSTOMER), orderController.getSpecificCustomerOrder);


export const orderRouter = router;