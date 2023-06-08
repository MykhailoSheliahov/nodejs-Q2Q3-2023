
import { Request, Response } from 'express';
import { dbController } from "./../controllers/dbController";

export class ProductController {
  static async getProducts(req: Request, res: Response) {
    const params = req.query;
    const products = await dbController.getProducts({ userId: params.userId as string });

    res.send(products)
  };

  static async getProductById(req: Request, res: Response) {
    const params = req.query;
    const products = await dbController.getProductById({
      userId: params.userId as string,
      productId: req.params.productId
    });

    res.send(products)
  };
};
