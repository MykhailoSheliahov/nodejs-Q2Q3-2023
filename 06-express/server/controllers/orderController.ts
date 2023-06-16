import { Request, Response } from 'express';

import { dbController } from './../controllers/dbController';
import { OrderConnector } from '../connectors/orderConnector';

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    const params = req.query;

    const order = await dbController.createOrder({
      userId: params.userId as string,
    });

    const total = OrderConnector.calcTotal(order)

    res.send({
      api: 'post profile/cart/checkout',
      statusCode: 200,
      message: 'Success',
      data: {
        order: {
          ...order,
          total
        }
      }
    })
  };
};
