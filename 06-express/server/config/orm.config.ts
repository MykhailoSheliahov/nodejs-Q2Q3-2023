import * as dotenv from 'dotenv';
import path from 'path';
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { Product } from '../entities/Product';
import { Cart } from '../entities/Cart';
import { Order } from '../entities/Order';
import { User } from '../entities/User';

dotenv.config({ path: path.join(__dirname, './../../../', '.env') });

const options: Options<PostgreSqlDriver> = {
  type: 'postgresql',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  dbName: process.env.POSTGRES_DB,
  populateAfterFlush: true,
  entities: [Product, Cart, Order, User], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: [Product, Cart, Order, User], // path to our TS entities (src), relative to `baseDir`
  migrations: {
    path: './dist/migrations', // path to the folder with migrations
    pathTs: './server/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  seeder: {
    path: './dist/seeders', // path to the folder with seeders
    pathTs: './server/seeders', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default options;
