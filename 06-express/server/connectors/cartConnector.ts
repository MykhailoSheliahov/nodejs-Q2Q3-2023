import { Cart } from './../types';

export class CartConnector {
  static hideUserIdProp(cart: Cart) {
    const { userId, ...data } = cart;
    return data;
  }
}
