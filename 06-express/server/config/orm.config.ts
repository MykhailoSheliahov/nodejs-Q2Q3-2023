import * as dotenv from 'dotenv'
import path from 'path'
import { Options } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

import { Product } from '../entities/Product'
import { Cart } from '../entities/Cart'
import { Order } from '../entities/Order'
import { User } from '../entities/User'

dotenv.config({ path: path.join(__dirname, './../../../', '.env') })

const options: Options<PostgreSqlDriver> = {
  type: 'postgresql',
  user: process.env.MIKRO_ORM_USER, //'node_gmp',
  password: process.env.MIKRO_ORM_PASSWORD, //'password123',
  host: process.env.MIKRO_ORM_HOST, //'localhost',
  dbName: process.env.MIKRO_ORM_DB_NAME, //'node_gmp',
  populateAfterFlush: true,
  entities: [Product, Cart, Order, User], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: [Product, Cart, Order, User], // path to our TS entities (src), relative to `baseDir`
  migrations: {
    path: './dist/migrations', // path to the folder with migrations
    pathTs: './server/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  seeder: {
    path: './server/seeders', // path to the folder with seeders
    pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
}

export default options
