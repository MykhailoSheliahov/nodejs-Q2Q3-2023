import { Request, Response } from 'express'

import { dbController } from './../controllers/dbController'

export class ProductController {
  static async getProducts(_req: Request, res: Response) {
    const products = await dbController.getProducts()
    res.send(products)
  }

  static async getProductById(req: Request, res: Response) {
    const product = await dbController.getProductById({
      productId: req.params.productId,
    })

    if (!product) {
      res.send({
        statusCode: 404,
        message: `There is no such product  with productId - ${req.params.productId}`,
      })
      return
    }

    res.send(product)
  }
}
