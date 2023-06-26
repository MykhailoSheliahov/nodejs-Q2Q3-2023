import express from 'express';

import { CartController } from '../controllers/cartController';

export const cartRouter = express.Router();

cartRouter.get('/', CartController.getCart);
cartRouter.put('/', CartController.updateCart);
cartRouter.delete('/', CartController.deleteCart);
cartRouter.post('/checkout', CartController.createOrder);
