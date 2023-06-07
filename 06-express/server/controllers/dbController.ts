import { dbConnector } from '../connectors/dbConnector';
import { ProductItem, Cart } from './../types';

export class dbController {
  static getUserCart({ userId }: {
    userId: string,
  }) {
    const storage = dbConnector.getDBData();
    const userCart = storage.carts.find(cart => cart.userId === userId);
    return userCart;
  };

  static updateCart({ userId, data }: {
    userId: string,
    data: ProductItem[]
  }) {
    const storage = dbConnector.getDBData();
    const userCart = storage.carts.find(cart => cart.userId === userId);

    if (userCart) {
      const otherCarts = storage.carts.filter(cart => cart.userId !== userId);
      userCart.items.push(...data);
      storage.carts = [...otherCarts, userCart];
      dbConnector.setDBData(storage);
      return userCart;
    }

    return [];
  };

  static deleteCart({ userId }: {
    userId: string,
  }) {
    const storage = dbConnector.getDBData(false);
    const otherCarts = storage.carts.filter(cart => cart.userId !== userId);
    const userCart = storage.carts.find(cart => cart.userId === userId);

    if (userCart) {
      userCart.deleted = true;
      storage.carts = [...otherCarts, userCart];
    }

    dbConnector.setDBData(storage);
  };

  static getProducts({ userId }: { userId: string }) {
    const storage = dbConnector.getDBData();
    const userCart = storage.carts.find(cart => cart.userId === userId);
    const products = userCart?.items.map(({ count, ...rest }) => rest.product);
    return products;
  };

  static getProductById({ userId, productId }: { userId: string, productId: string }) {
    const storage = dbConnector.getDBData();
    const userCart = storage.carts.find(cart => cart.userId === userId);
    const products = userCart?.items.find(item => item.product.id === productId)?.product;
    return products;
  };
}
