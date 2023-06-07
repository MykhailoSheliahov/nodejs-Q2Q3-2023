import express from 'express';

import { CartController } from '../controllers/cartController';
import { authUser } from '../middlewares/authUser';

export const cartRouter = express.Router();

cartRouter.get('/profile/cart', authUser, CartController.getCart);
cartRouter.put('/profile/cart', authUser, CartController.updateCart);
cartRouter.delete('/profile/cart', authUser, CartController.deleteCart);
cartRouter.post('/profile/cart/checkout', authUser, CartController.createOrder);
