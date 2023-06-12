import { dbConnector } from '../connectors/dbConnector';
import { dbController } from '../controllers/dbController';
import { Cart, Order } from './../types';
import { Collection } from 'mongodb';

export class OrderMigrations {
  static async createCollection() {
    await dbController.db.createCollection('orders', { capped: false });
  }
  static async populateDB(collection: Collection<Order>, data: Cart) {
    delete data?.deleted;
    const total = dbConnector.calcTotal(data);

    const order: Order = {
      ...data,
      cartId: data._id,
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

    await collection.insertOne(order);
  }
};
