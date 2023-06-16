import { EntityManager } from "@mikro-orm/postgresql";
import { Seeder } from '@mikro-orm/seeder';

import { CartSeeder } from './cartSeeder';
import { OrderSeeder } from './orderSeeder ';
import { ProductSeeder } from './productSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await CartSeeder.seed(em);
    await ProductSeeder.seed(em);
    await OrderSeeder.seed(em);
  };
};
