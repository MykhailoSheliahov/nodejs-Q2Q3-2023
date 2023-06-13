import { Request, Response } from 'express';

import dbController from './../controllers/dbController';

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    const params = req.query;

    const userCart = await dbController.createOrder({
      userId: params.userId as string,
    });

    userCart.id = userCart._id;
    delete userCart._id;

    res.send({
      api: 'post profile/cart/checkout',
      statusCode: 200,
      message: 'Success',
      data: {
        order:userCart
      }
    })
  };
};

