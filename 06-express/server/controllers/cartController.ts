import { Request, Response } from 'express';

import { dbController } from './../controllers/dbController';
import { CartConnector } from '../connectors/cartConnector';
import { OrderController } from './orderController';

export class CartController {
  static async getCart(req: Request, res: Response) {
    const params = req.query;

    const userCart = await dbController.getUserCart({
      userId: params.userId as string,
    })

    const total = CartConnector.calcTotal(userCart);
    const cart = CartConnector.hideUserProps(userCart);

    res.send({
      statusCode: 200,
      message: 'Success',
      data: {
        cart,
        total
      }
    })
  };

  static async updateCart(req: Request, res: Response) {
    const params = req.query;
    const { items } = req.body

    const userCart = await dbController.updateCart({
      userId: params.userId as string,
      data: items
    });
    
    const total = CartConnector.calcTotal(userCart);
    const cart = CartConnector.hideUserProps(userCart);

    res.send({
      statusCode: 200,
      message: 'Success',
      data: {
        cart,
        total
      }
    })
  };

  static async deleteCart(req: Request, res: Response) {
    const params = req.query;

    await dbController.deleteCart({
      userId: params.userId as string,
    });

    res.send({
      'statusCode': 200,
      'message': `Cart for '${params.userId}' successfully deleted`,
    });
  };

  static async createOrder(req: Request, res: Response) {
    await OrderController.createOrder(req, res);
  };
};
