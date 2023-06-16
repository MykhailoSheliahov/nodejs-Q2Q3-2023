import { v4 as uuidv4 } from 'uuid';
import { EntityManager, } from '@mikro-orm/postgresql';

import { DI } from '../app'
import { Cart } from '../entities/Cart';

export class CartSeeder {
  static populateDB(userId: string) {
    DI.cartRepository.create({
      userId,
      deleted: false,
      items: []
    });
  };

  static async seed(em: EntityManager) {
    em.create(Cart, {
      // order: 1,
      userId: 'user1',
      deleted: false,
      items: [
        {
          product: {
            id: uuidv4(),
            title: 'Orange',
            description: 'Orange description',
            price: 10,
          },
          count: 4
        },
        {
          product: {
            id: uuidv4(),
            title: 'Banana',
            description: 'Banana description',
            price: 10,
          },
          count: 6
        }
      ]
    }, { persist: true });

    em.create(Cart, {
      // order: 2,
      userId: 'user2',
      deleted: false,
      items: [
        {
          product: {
            id: uuidv4(),
            title: 'Apple',
            description: 'Apple description',
            price: 15,
          },
          count: 4
        },
        {
          product: {
            id: uuidv4(),
            title: 'Lemon',
            description: 'Lemon description',
            price: 10,
          },
          count: 4
        }
      ]
    }, { persist: true });

    em.create(Cart, {
      // order: 3,
      userId: 'user3',
      deleted: true,
      items: [
        {
          product: {
            id: uuidv4(),
            title: 'Apple',
            description: 'Apple description',
            price: 15,
          },
          count: 4
        },
        {
          product: {
            id: uuidv4(),
            title: 'Lemon',
            description: 'Lemon description',
            price: 10,
          },
          count: 4
        }
      ]
    }, { persist: true });
  }

}
