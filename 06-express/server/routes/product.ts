import express from 'express';

import { ProductController } from '../controllers/productController';

export const productRouter = express.Router();

productRouter.get('/', ProductController.getProducts);
productRouter.get('/:productId', ProductController.getProductById);
