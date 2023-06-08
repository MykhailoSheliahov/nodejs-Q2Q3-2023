import express from 'express';

import { CartController } from '../controllers/cartController';
import { authUser } from '../middlewares/authUser';

export const cartRouter = express.Router();

cartRouter.get('/', authUser, CartController.getCart);
cartRouter.put('/', authUser, CartController.updateCart);
cartRouter.delete('/', authUser, CartController.deleteCart);
cartRouter.post('/checkout', authUser, CartController.createOrder);
