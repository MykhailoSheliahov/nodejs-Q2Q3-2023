import express from 'express';

import { LoginController } from '../controllers/loginController';

export const loginRouter = express.Router();

loginRouter.post('/', LoginController.login);
