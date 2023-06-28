import { Request, Response } from 'express'

import { dbController } from './../controllers/dbController'
import { CartConnector } from '../connectors/cartConnector'
import { OrderController } from './orderController'
import { User } from '../types'

export class CartController {
  static async getCart(req: Request, res: Response) {
    const { id } = req.query.user as unknown as User

    const userCart = await dbController.getUserCart({
      userId: id!,
    })

    const total = CartConnector.calcTotal(userCart)
    const cart = CartConnector.hideUserProps(userCart)

    res.send({
      statusCode: 200,
      message: 'Success',
      data: {
        cart,
        total,
      },
    })
  }

  static async updateCart(req: Request, res: Response) {
    const { id } = req.query.user as unknown as User
    const { items } = req.body

    const userCart = await dbController.updateCart({
      userId: id!,
      data: items,
    })

    const total = CartConnector.calcTotal(userCart)
    const cart = CartConnector.hideUserProps(userCart)

    res.send({
      statusCode: 200,
      message: 'Success',

      data: {
        cart,
        total,
      },
    })
  }

  static async deleteCart(req: Request, res: Response) {
    const { id } = req.query.user as unknown as User

    await dbController.deleteCart({
      userId: id!,
    })

    res.send({
      statusCode: 200,
      message: `Cart for '${id}' successfully deleted`,
    })
  }

  static async createOrder(req: Request, res: Response) {
    await OrderController.createOrder(req, res)
  }
}
