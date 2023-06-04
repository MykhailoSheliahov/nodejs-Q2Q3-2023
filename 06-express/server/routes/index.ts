import express from 'express';

import { authUser } from '../middlewares/authUser';

export const indexRouter = express.Router();

indexRouter.get('/', authUser, (_req, res) => {
  res.send('home')
});
