import { Request, Response } from 'express';

import { dbController } from './dbController';
import { User } from '../types';

export class RegisterController {
  static async register(req: Request, res: Response) {
    try {
      const { first_name, last_name, isCartOwner, email, password } = req.body.params;

      if (!(email && password && first_name && last_name)) {
        return res.send({
          statusCode: 400,
          message: 'All input is required'
        });
      }

      const oldUser = await dbController.getUser({ email })

      if (oldUser) {
        return res.send({
          statusCode: 409,
          message: 'User Already Exist. Please Login'
        });
      }

      const user: User = {
        first_name,
        last_name,
        email: email.toLowerCase(),
        password,
        role: isCartOwner === 'true' ? 'owner' : 'reader'
      };

      dbController.createUser(user);

      res.send({
        statusCode: 201,
        message: 'User successfully registered'
      });
    } catch (err) {
      console.error(err);
      res.send({
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
  };
};
