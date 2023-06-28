import { DI } from './../app'
import { ProductItem, Cart, Product, Order, User } from './../types'
import { CartSeeder } from '../seeders/cartSeeder'
import { OrderSeeder } from '../seeders/orderSeeder '
import { UserSeeder } from '../seeders/userSeeder'

export class dbController {
  static async getUserCart({ userId }: { userId: number }): Promise<Cart> {
    const isUserCartExist = await DI.cartRepository.findOne({ userId, deleted: false })

    if (!isUserCartExist || isUserCartExist.deleted) {
      CartSeeder.populateDB(userId)

      const cart = await DI.cartRepository.findOne({ userId, deleted: false })
      return cart as unknown as Cart
    }

    return isUserCartExist as unknown as Cart
  }

  static async updateCart({
    userId,
    data,
  }: {
    userId: number
    data: ProductItem[]
  }): Promise<Cart> {
    const cart = await dbController.getUserCart({ userId })

    cart.items = [...cart.items, ...data]
    await DI.em.persistAndFlush(cart)

    const refetchedCart = await dbController.getUserCart({ userId })
    return refetchedCart
  }

  static async deleteCart({ userId }: { userId: number }) {
    const cart = await dbController.getUserCart({ userId })
    cart.deleted = true
    await DI.em.persistAndFlush(cart)
  }

  static async getProducts(): Promise<Product[]> {
    return DI.productRepository.findAll() as unknown as Product[]
  }

  static async getProductById({ productId }: { productId: string }) {
    return DI.productRepository.findOne({ id: Number(productId) })
  }

  static async createOrder({ userId }: { userId: number }) {
    const cart = await dbController.getUserCart({ userId })
    const order = await DI.orderRepository.findOne({ userId })

    if (!order) {
      OrderSeeder.populateDB(userId, cart)

      const refetchedOrder = await DI.orderRepository.findOne({ userId })
      return refetchedOrder as unknown as Order
    }

    order.items = cart.items
    await DI.em.persistAndFlush(order)

    const refetchedOrder = await DI.orderRepository.findOne({ userId })
    return refetchedOrder as unknown as Order
  }

  static async getUser({ email }: { email: string }): Promise<User | null> {
    const order = await DI.userRepository.findOne({ email })

    if (!order) {
      return null
    }

    return order as unknown as User
  }

  static createUser(params: User) {
    UserSeeder.populateDB(params)
  }
}
