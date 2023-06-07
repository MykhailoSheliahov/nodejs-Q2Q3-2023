import express from 'express';

import { indexRouter } from './routes/index';
import { cartRouter } from './routes/cart';
import { productRouter } from './routes/product';
import { orderRouter } from './routes/order';

const app = express();

app.use(express.json());
app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

app.listen({ port: 3000 }, () => {
    console.log('Server is started');
});
