import express from 'express';

import { OrderController } from '../controllers/orderController';

export const orderRouter = express.Router();

orderRouter.post('/checkout', OrderController.createOrder)
