import express from 'express';

import { ProductController } from '../controllers/productController';
import { authUser } from '../middlewares/authUser';

export const productRouter = express.Router();

productRouter.get('/', authUser, ProductController.getProducts);
productRouter.get('/:productId', authUser, ProductController.getProductById);
