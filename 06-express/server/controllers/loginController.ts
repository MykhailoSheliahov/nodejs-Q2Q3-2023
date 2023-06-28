import { Request, Response } from 'express';
import path from 'path';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { debug } from 'debug';

const debuglog = debug('routes:login');

import { dbController } from './dbController';

dotenv.config({ path: path.join(__dirname, './../../../', '.env') });

export class LoginController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body.params;

      if (!(email && password)) {
        debuglog('Email and password are required');

        return res.send({
          statusCode: 400,
          message: 'All input is required'
        });
      }

      const user = await dbController.getUser({ email });
      debuglog('Is user exist', user);

      if (!user) {
        return res.send({
          statusCode: 400,
          message: 'Invalid Credentials'
        });
      }

      const token = jwt.sign(
        { ...user },
        process.env.TOKEN_KEY!,
        {
          expiresIn: '2h',
        }
      );
      debuglog('Token created:', token);

      return res.send({
        statusCode: 200,
        token
      });

    } catch (err) {
      debuglog('Error ocurred:', err);
      
      res.send({
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
  };
};
