import express from 'express';

import { RegisterController } from '../controllers/registerController';

export const registerRouter = express.Router();

registerRouter.post('/', RegisterController.register);
