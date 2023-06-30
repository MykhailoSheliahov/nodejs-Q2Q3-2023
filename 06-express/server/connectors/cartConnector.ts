import { Cart } from './../types';

export class CartConnector {
  static hideUserProps(cart: Cart) {
    delete cart.userId;
    delete cart.deleted;
    return cart;
  }

  static calcTotal(cart: Cart) {
    const total =
      cart.items.length > 0
        ? cart.items
            .map((item) => item.product.price * item.count)
            .reduce((item, acc) => item + acc, 0)
        : 0;
    return total;
  }
}
