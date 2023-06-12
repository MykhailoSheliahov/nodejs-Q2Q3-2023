import express from 'express';

import { OrderController } from '../controllers/orderController';
import { authUser } from '../middlewares/authUser';

export const orderRouter = express.Router();

orderRouter.post('/checkout', authUser, OrderController.createOrder)
