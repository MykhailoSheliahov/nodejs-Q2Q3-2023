import { v4 as uuidv4 } from 'uuid';
import { EntityManager, } from '@mikro-orm/postgresql';

import { Order } from '../entities/Order';
import { Cart } from './../types';
import { DI } from '../app';

export class OrderSeeder {
  static async populateDB(userId: string, data: Cart) {
    DI.orderRepository.create({
      userId,
      cartId: data.id,
      items: data.items,
      payment: {
        type: 'Contactless',
        address: 'Lviv st. 5',
        creditCard: 'Visa'
      },
      delivery: {
        type: "By car",
        address: 'Kharkiv st. 10',
      },
      comments: '',
      status: 'Pending',
      total: 0,
    });
  };

  static async seed(em: EntityManager) {
    em.create(Order, {
      // cart: 1,
      userId: 'user1',
      cartId: '1',
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
      ],
      payment: {
        type: 'Contactless',
        address: 'Lviv st. 5',
        creditCard: 'Visa'

      },
      delivery: {
        address: 'Kharkiv st. 10',
        type: "By car",

      },
      comments: '',
      status: 'Pending',
      total: 1000,
    }, { persist: true });

    em.create(Order, {
      // cart: 1,
      userId: 'user2',
      cartId: '2',
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
      ],
      payment: {
        type: 'Contactless',
        address: 'Kyiv st. 50',
        creditCard: 'Visa'

      },
      delivery: {
        address: 'Odessa st. 100',
        type: "By car",
      },
      comments: '',
      status: 'Pending',
      total: 500,
    }, { persist: true });
  };
};
