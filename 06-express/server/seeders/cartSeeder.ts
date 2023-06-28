import { v4 as uuidv4 } from 'uuid'
import { EntityManager } from '@mikro-orm/postgresql'

import { DI } from '../app'
import { Cart } from '../entities/Cart'

export class CartSeeder {
  static populateDB(userId: number) {
    DI.cartRepository.create({
      userId,
      deleted: false,
      items: [],
    })
  }

  static async seed(em: EntityManager) {
    em.create(
      Cart,
      {
        userId: 1,
        deleted: false,
        items: [
          {
            product: {
              id: Number(uuidv4()),
              title: 'Orange',
              description: 'Orange description',
              price: 10,
            },
            count: 4,
          },
          {
            product: {
              id: Number(uuidv4()),
              title: 'Banana',
              description: 'Banana description',
              price: 10,
            },
            count: 6,
          },
        ],
      },
      { persist: true },
    )

    em.create(
      Cart,
      {
        userId: 2,
        deleted: false,
        items: [
          {
            product: {
              id: Number(uuidv4()),
              title: 'Apple',
              description: 'Apple description',
              price: 15,
            },
            count: 4,
          },
          {
            product: {
              id: Number(uuidv4()),
              title: 'Lemon',
              description: 'Lemon description',
              price: 10,
            },
            count: 4,
          },
        ],
      },
      { persist: true },
    )

    em.create(
      Cart,
      {
        userId: 3,
        deleted: true,
        items: [
          {
            product: {
              id: Number(uuidv4()),
              title: 'Apple',
              description: 'Apple description',
              price: 15,
            },
            count: 4,
          },
          {
            product: {
              id: Number(uuidv4()),
              title: 'Lemon',
              description: 'Lemon description',
              price: 10,
            },
            count: 4,
          },
        ],
      },
      { persist: true },
    )
  }
}
