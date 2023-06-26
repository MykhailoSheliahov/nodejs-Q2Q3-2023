import { Request, Response } from 'express';
import path from 'path';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'

import { dbController } from './dbController';

dotenv.config({ path: path.join(__dirname, './../../../', '.env') });

export class LoginController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body.params;

      if (!(email && password)) {
        return res.send({
          statusCode: 400,
          message: 'All input is required'
        });
      }

      const user = await dbController.getUser({ email });

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

      return res.send({
        statusCode: 200,
        token
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
