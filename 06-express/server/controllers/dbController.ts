import { MongoClient, Db, ObjectId } from 'mongodb';

import { ProductItem, Cart, Product, Order } from './../types';
import { dbConnector } from '../connectors/dbConnector';

class dbController {
  static dbName = 'shop';
  static url = `mongodb://localhost:27017/${dbController.dbName}`;
  static db: Db;

  constructor() {
    dbController.connect();
  }

  static async connect() {
    try {
      const client = new MongoClient(dbController.url);
      await client.connect();
      dbController.db = client.db(dbController.dbName);
      const collections = await dbController.db.command({ listCollections: 1, filter: {}, nameOnly: true });

      const [cart, order, product] = collections.cursor.firstBatch.map((v: Record<string, unknown>) => v.name).sort();

      if (!cart) {
        await dbController.db.createCollection('carts', { capped: false });
      }

      if (!order) {
        await dbController.db.createCollection('orders', { capped: false });
      }

      if (!product) {
        await dbController.db.createCollection('products', { capped: false })
        const collection = dbController.db.collection<Product>('products');
        collection.insertMany([
          {
            title: 'Orange',
            description: 'Orange description',
            price: 10
          },
          {
            title: 'Banana',
            description: 'Banana description',
            price: 10
          },
          {
            title: 'Apple',
            description: 'Apple description',
            price: 10
          },
          {
            title: 'Potato',
            description: 'Apple description',
            price: 10
          }
        ]);
      }
    } catch (e) {
      console.log('Throw error in DB connection', e);
      process.exit(1);
    }
  };

  getCartCollection() {
    const collection = dbController.db.collection<Cart>('carts');
    return collection;
  };

  getProductCollection() {
    const collection = dbController.db.collection<Product>('products');
    return collection;
  };

  getOrderCollection() {
    const collection = dbController.db.collection<Order>('orders');
    return collection;
  };

  async getUserCart({ userId }: {
    userId: string,
  }) {
    const collection = this.getCartCollection()
    const data = await collection.findOne<Cart>({ userId });

    if (!data || data?.deleted === true) {
      await collection.insertOne({ userId, deleted: false, items: [] });
      const data = await collection.findOne<Cart>({ userId, deleted: false });
      delete data?.deleted;
      return data!;
    }
    delete data?.deleted;
    return data;
  };

  async updateCart({ userId, data }: {
    userId: string,
    data: ProductItem[]
  }) {
    const collection = this.getCartCollection()
    await collection.updateOne({ userId }, { $push: { "items": { $each: data } } })
    const userCart = await this.getUserCart({ userId });
    return userCart;
  };

  async deleteCart({ userId }: { userId: string }) {
    const collection = this.getCartCollection()
    await collection.updateOne({ userId }, { $set: { "deleted": true } })
  };

  async getProducts() {
    const collection = this.getProductCollection();
    const data = await collection.find({}).toArray();
    return data;
  };

  async getProductById({ productId }: { productId: string }) {
    const collection = this.getProductCollection();
    const objId = new ObjectId(productId);
    const data = await collection.findOne<Product>({ _id: objId });
    return data;
  };

  async createOrder({ userId }: {
    userId: string,
  }) {
    const collection = this.getOrderCollection()
    const orderIsExist = await collection.findOne<Order>({ userId });

    if (!orderIsExist) {
      const userCart = await this.getUserCart({ userId });
      delete userCart?.deleted;
      const total = dbConnector.calcTotal(userCart);

      const order: Order = {
        ...userCart,
        cartId: userCart._id,
        payment: {
          type: 'Contactless',
          address: 'Home address',
          creditCard: 'VISA>'
        },
        delivery: {
          type: 'Car',
          address: 'Lviv, str. 10'
        },
        comments: '',
        status: 'Active',
        total
      };

      collection.insertOne(order);
      const data = await collection.findOne<Order>({ userId });
      return data!;
    };

    const data = await collection.findOne<Order>({ userId });
    return data!;
  }
}

export default new dbController();
