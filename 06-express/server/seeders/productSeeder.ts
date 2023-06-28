import { EntityManager } from '@mikro-orm/postgresql'

import { Product } from '../entities/Product'

export class ProductSeeder {
  static async seed(em: EntityManager) {
    em.create(
      Product,
      {
        title: 'Orange',
        description: 'Orange description',
        price: 10,
      },
      { persist: true },
    )

    em.create(
      Product,
      {
        title: 'Banana',
        description: 'Banana description',
        price: 10,
      },
      { persist: true },
    )

    em.create(
      Product,
      {
        title: 'Apple',
        description: 'Apple description',
        price: 15,
      },
      { persist: true },
    )

    em.create(
      Product,
      {
        title: 'Lemon',
        description: 'Lemon description',
        price: 10,
      },
      { persist: true },
    )
  }
}
