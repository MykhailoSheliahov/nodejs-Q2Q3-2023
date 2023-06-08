import express from 'express';

import { CartController } from '../controllers/cartController';
import { authUser } from '../middlewares/authUser';

export const orderRouter = express.Router();

orderRouter.post('/checkout', authUser, CartController.createOrder)
