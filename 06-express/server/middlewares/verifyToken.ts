import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken';

import { User } from '../types';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.send({
      statusCode: 401,
      message: 'Token is required'
    });
  }

  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(403).send('Invalid Token');
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as User;
    req.query.user = user as unknown as string;
  } catch (err) {
    return res.send({
      statusCode: 400,
      message: 'Invalid Token',
    })
  }
  return next();
};
