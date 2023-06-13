import { Cart } from './../types';

export class dbConnector {
  static calcTotal(cart: Cart) {
    const total = cart.items.map(item => item.product.price * item.count).reduce((item, acc) => item + acc, 0) ?? 0;
    return total;
  }
}

