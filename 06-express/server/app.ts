import { Socket } from 'net'
import express from 'express'
import http from 'http'
import path from 'path'
import pg from 'pg'
import * as dotenv from 'dotenv'
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { debug } from 'debug'

import { Cart } from './entities/Cart'
import { Order } from './entities/Order'
import { Product } from './entities/Product'
import { User } from './entities/User'
import { indexRouter } from './routes/index'
import { cartRouter } from './routes/cart'
import { productRouter } from './routes/product'
import { orderRouter } from './routes/order'
import { registerRouter } from './routes/register'
import { loginRouter } from './routes/login'
import config from './config/orm.config'
import { verifyToken } from './middlewares/verifyToken'
import { isCartOwner } from './middlewares/isCartOwner'
import { logRequest } from './middlewares/logRequest'
import { DatabaseSeeder } from './seeders/seeder'

dotenv.config({ path: path.join(__dirname, './../../', '.env') })

const debuglog = debug('app')

const port = process.env.SERVER_PORT || 3000
debuglog('port' + port)

const app = express()

export const DI = {} as {
  server: http.Server
  orm: MikroORM
  em: EntityManager
  cartRepository: EntityRepository<Cart>
  productRepository: EntityRepository<Product>
  orderRepository: EntityRepository<Order>
  userRepository: EntityRepository<User>
}

export const init = (async () => {
  const client = new pg.Client({
    host: process.env.MIKRO_ORM_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.MIKRO_ORM_USER,
    password: process.env.MIKRO_ORM_PASSWORD,
    database: process.env.MIKRO_ORM_DB_NAME,
  })

  try {
    await client.connect()
    debuglog('DB is connected')
  } catch (err) {
    debuglog('DB connection error', err)
  }

  DI.orm = await MikroORM.init<PostgreSqlDriver>(config)
  const seeder = DI.orm.getSeeder()
  await DI.orm.getSchemaGenerator().refreshDatabase()
  await seeder.seed(DatabaseSeeder)

  DI.em = DI.orm.em
  DI.productRepository = DI.orm.em.getRepository(Product)
  DI.cartRepository = DI.orm.em.getRepository(Cart)
  DI.orderRepository = DI.orm.em.getRepository(Order)
  DI.userRepository = DI.orm.em.getRepository(User)

  app.use(express.json(), logRequest)
  app.use((_req, _res, next) => RequestContext.create(DI.orm.em, next))
  app.use('/', indexRouter)
  app.use('/register', verifyToken, registerRouter)
  app.use('/login', loginRouter)
  app.use('/cart', verifyToken, isCartOwner, cartRouter)
  app.use('/product', productRouter)
  app.use('/order', verifyToken, isCartOwner, orderRouter)
  app.get('/health', (_req, res) => {
    client.on('error', (error) => {
      debuglog('router - /health has error' + error)

      res.send({
        statusCode: 500,
        message: 'Error connecting to database',
        error,
      })
    })

    res.send({
      statusCode: 200,
      message: 'Ok',
    })

    client.end()
    debuglog('router - /health works')
  })
  app.use((_req, res) => res.status(404).json({ message: 'No route found' }))

  DI.server = app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`)
  })

  // Graceful shutdown
  let connections: Socket[] = []

  DI.server.on('connection', (connection) => {
    // register connections
    connections.push(connection)

    // remove/filter closed connections
    connection.on('close', () => {
      connections = connections.filter((currentConnection) => currentConnection !== connection)
    })
  })

  const shutdown = () => {
    console.log('Received kill signal, shutting down gracefully')

    DI.server.close(() => {
      console.log('Closed out remaining connections')
      process.exit(0)
    })

    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down')
      process.exit(1)
    }, 20000)

    // end current connections
    connections.forEach((connection) => connection.end())

    // then destroy connections
    setTimeout(() => {
      connections.forEach((connection) => connection.destroy())
    }, 10000)
  }

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
})()
