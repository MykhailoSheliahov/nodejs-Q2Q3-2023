import { NextFunction, Request, Response } from 'express';

import { User } from '../types';

export const isCartOwner = async (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.query.user as unknown as User;

  if (role !== 'owner') {
    return res.send({
      statusCode: 400,
      message: 'Only owners can manage it'
    });
  }
  next();
};
