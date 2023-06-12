import { Collection } from 'mongodb';
import { dbController } from '../controllers/dbController';
import { Cart } from './../types';

export class CartMigrations {
  static async createCollection() {
    await dbController.db.createCollection('carts', { capped: false });
  };

  static async populateDB(collection: Collection<Cart>, userId: string) {
    await collection.insertOne({ userId, deleted: false, items: [] });
  };
};
