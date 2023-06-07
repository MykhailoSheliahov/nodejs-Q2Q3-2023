import express from 'express';

import { ProductController } from '../controllers/productController';
import { authUser } from '../middlewares/authUser';

export const productRouter = express.Router();

productRouter.get('/products', authUser, ProductController.getProducts);
productRouter.get('/products/:productId', authUser, ProductController.getProductById);
