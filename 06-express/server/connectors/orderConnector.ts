import { Order } from '../types';

export class OrderConnector {
  static calcTotal(order: Order) {
    const total =
      order.items.length > 0
        ? order.items
            .map((item) => item.product.price * item.count)
            .reduce((item, acc) => item + acc, 0)
        : 0;
    return total;
  }
}
