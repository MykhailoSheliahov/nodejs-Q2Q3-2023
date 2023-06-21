import express from 'express';
import http from 'http';
import path from 'path';
import pg from 'pg';
import * as dotenv from 'dotenv';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

import { Cart } from './entities/Cart';
import { Order } from './entities/Order';
import { Product } from './entities/Product';
import { indexRouter } from './routes/index';
import { cartRouter } from './routes/cart';
import { productRouter } from './routes/product';
import { orderRouter } from './routes/order';
import config from './config/orm.config'

dotenv.config({ path: path.join(__dirname, './../../', '.env') });

const port = process.env.PORT || 3000;

const app = express();

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  cartRepository: EntityRepository<Cart>,
  productRepository: EntityRepository<Product>,
  orderRepository: EntityRepository<Order>,
};

export const init = (async () => {
  const client = new pg.Client({
    host: process.env.MIKRO_ORM_HOST,
    port: 5432,
    user: process.env.MIKRO_ORM_USER,
    password: process.env.MIKRO_ORM_PASSWORD,
    database: process.env.MIKRO_ORM_DB_NAME,
  })

  await client.connect();

  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);
  DI.em = DI.orm.em;
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.cartRepository = DI.orm.em.getRepository(Cart);
  DI.orderRepository = DI.orm.em.getRepository(Order);

  app.use(express.json());
  app.use((_req, _res, next) => RequestContext.create(DI.orm.em, next));
  app.use('/', indexRouter);
  app.use('/cart', cartRouter);
  app.use('/product', productRouter);
  app.use('/order', orderRouter);
  app.use((_req, res) => res.status(404).json({ message: 'No route found' }));

  DI.server = app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
  });
})();
