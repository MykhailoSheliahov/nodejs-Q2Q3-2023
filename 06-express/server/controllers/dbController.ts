import { MongoClient } from 'mongodb';

import { ProductItem, Cart } from './../types';

export class dbController {
  static url = 'mongodb://localhost:27017/shop';
  static dbName = 'shop';
  static client = new MongoClient(dbController.url);

  static async connect() {
    try {
      await dbController.client.connect();
    } catch (e) {
      console.log('Throw error in DB connection', e);
      process.exit(1);
    }
  };

  static async getCollection() {
    await dbController.connect();
    const db = dbController.client.db(dbController.dbName);
    const collection = db.collection<Cart>('carts');
    return collection;
  };

  static async getUserCart({ userId }: {
    userId: string,
  }) {
    const collection = await dbController.getCollection()
    const data = await collection.findOne<Cart>({ userId });

    if (!data || data?.deleted === true) {
      collection.insertOne({ id: "2", userId, items: [] }) ;
      const data = await collection.findOne<Cart>({ userId });
      return data;
    }

    delete data?.deleted;

    return data;
  };

  static async updateCart({ userId, data }: {
    userId: string,
    data: ProductItem[]
  }) {
    const userCart = await dbController.getUserCart({ userId });

    if (userCart) {
      const collection = await dbController.getCollection()
      await collection.updateOne({ userId }, { $push: { "items": { $each: data } } })
      const userCart = await dbController.getUserCart({ userId });
      return userCart;
    }

    return [];
  };

  static async deleteCart({ userId }: { userId: string }) {
    const collection = await dbController.getCollection()
    await collection.updateOne({ userId }, { $set: { "deleted": true } })
  };

  static async getProducts({ userId }: { userId: string }) {
    const userCart = await dbController.getUserCart({ userId })
    const products = userCart?.items.map(({ count, ...rest }) => rest.product);
    return products;
  };

  static async getProductById({ userId, productId }: { userId: string, productId: string }) {
    const userCart = await dbController.getUserCart({ userId })
    const products = userCart?.items.find(item => item.product.id === productId)?.product;
    return products;
  };
}
