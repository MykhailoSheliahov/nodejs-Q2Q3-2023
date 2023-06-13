import { dbController } from '../controllers/dbController';
import { Product } from './../types'

export class ProductMigrations {
  static async createCollection() {
    await dbController.db.createCollection('carts', { capped: false });
  }
  static async populateDB() {
    const collection = dbController.db.collection<Product>('products');
    await collection.insertMany([
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
  };
};
