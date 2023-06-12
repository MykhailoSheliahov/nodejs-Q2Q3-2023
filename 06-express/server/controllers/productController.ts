
import { Request, Response } from 'express';
import dbController from "./../controllers/dbController";
import { Product } from './../types'

export class ProductController {
  static async getProducts(req: Request, res: Response) {
    const products: Product[] = await dbController.getProducts();

    const productAdapted = products.map(item => {
      item.id = item._id as unknown as string;
      delete item._id;
      return item;
    })

    res.send(productAdapted)
  };

  static async getProductById(req: Request, res: Response) {
    const products = await dbController.getProductById({
      productId: req.params.productId
    });

    if (!products) {
      res.send({
        'statusCode': 404,
        'message': `There is no such product  with productId - ${req.params.productId}`,
      });
      return;
    }

    products.id = products._id as unknown as string;
    delete products._id;

    res.send(products)
  };
};
