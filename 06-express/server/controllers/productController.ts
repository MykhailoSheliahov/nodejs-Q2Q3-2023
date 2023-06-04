
import { Request, Response } from 'express';
import { dbController } from "./../controllers/dbController";

export class ProductController {
  static getProducts(req: Request, res: Response) {
    const params = req.query;
    const products = dbController.getProducts({ userId: params.userId as string });
    
    res.send(products)
  };

  static getProductById(req: Request, res: Response) {
    const params = req.query;
    const products = dbController.getProductById({
      userId: params.userId as string,
      productId: req.params.productId
    });

    res.send(products)
  };
};
