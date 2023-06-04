import { Request, Response } from 'express';

import { dbController } from './../controllers/dbController';
import { CartConnector } from '../connectors/cartConnector';

export class CartController {
  static getCart(req: Request, res: Response) {
    const params = req.query;

    const userCart = dbController.getUserCart({
      userId: params.userId as string,
    })

    if (!userCart) {
      return res.send({
        api: 'get profile/cart',
        statusCode: 200,
        message: 'Success',
        data: {
          cart: {
            id: params.userId as string,
            items: []
          }
        }
      })
    }

    const data = CartConnector.hideUserIdProp(userCart);

    res.send({
      api: 'get profile/cart',
      statusCode: 200,
      message: 'Success',
      data: { cart: data }
    })
  };

  static updateCart(req: Request, res: Response) {
    const params = req.query;
    const { cartId, items } = req.body

    const updatedCart = dbController.updateCart({
      userId: params.userId as string,
      data: items
    });

    res.send({
      api: 'put profile/cart',
      statusCode: 200,
      message: 'Success',
      data: { cart: updatedCart }
    })
  };

  static deleteCart(req: Request, res: Response) {
    const params = req.query;

    dbController.deleteCart({
      userId: params.userId as string,
    });

    res.send({
      api: 'delete profile/cart',
      'statusCode': 200,
      'message': `Cart ${params.userId} successfully deleted`,
    });
  };

  static createOrder(req: Request, res: Response) {
    const params = req.query;

    const userCart = dbController.getUserCart({
      userId: params.userId as string,
    });

    if (!userCart) {
      return res.send({ status: 404, message: 'Not found' })
    }

    const { id: cartId, ...data } = userCart;

    res.send({
      api: 'post profile/cart/checkout',
      statusCode: 200,
      message: 'Success',
      data: {
        order: {
          ...data,
          id: 'order1',
          cartId,
          payment: {
            type: 'Type1',
            address: 'address',
            creditCard: 'creditCard'
          },
          delivery: {
            type: 'delivery',
            address: 'address'
          },
          comments: 'comments',
          status: 'Pending',
          total: 0
        }
      }
    })
  };
};
