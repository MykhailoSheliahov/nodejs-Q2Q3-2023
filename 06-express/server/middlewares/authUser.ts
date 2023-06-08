import { Request, Response, NextFunction } from 'express';

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const params = req.query;
  
  if ((params.userId as string) === 'user1') {
    return next();
  }

  res.send({ status: 401, message: 'Invalid credentials' });
}
