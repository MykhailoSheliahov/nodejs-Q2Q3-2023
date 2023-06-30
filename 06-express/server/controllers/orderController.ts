import { Request, Response } from 'express';

import { dbController } from './../controllers/dbController';
import { OrderConnector } from '../connectors/orderConnector';
import { User } from '../types';

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    const { id } = req.query.user as unknown as User;

    const order = await dbController.createOrder({
      userId: id!,
    });

    const total = OrderConnector.calcTotal(order);

    res.send({
      api: 'post profile/cart/checkout',
      statusCode: 200,
      message: 'Success',
      data: {
        order: {
          ...order,
          total,
        },
      },
    });
  }
}
