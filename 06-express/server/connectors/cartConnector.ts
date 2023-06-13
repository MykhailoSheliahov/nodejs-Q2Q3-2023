import { Cart, Order } from './../types';

export class CartConnector {
  static hideUserIdProp(cart: Cart) {
    delete cart.userId;
    return cart;
  };

  static calcTotal(cart: Cart) {
    const total = cart.items.length > 0 ? cart.items.map(item => item.product.price * item.count).reduce((item, acc) => item + acc, 0) : 0;
    return total;
  };

  static swapIds(cart: Cart) {
    cart.id = cart._id;
    delete cart._id;
    return cart;
  };
}
