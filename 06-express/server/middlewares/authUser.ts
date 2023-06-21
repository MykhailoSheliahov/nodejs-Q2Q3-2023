import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv'
import path from 'path';

dotenv.config({ path: path.join(__dirname, './../../../', '.env') });

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const params = req.query;
  
  if ((params.userId as string) === process.env.CURRENT_USER) {
    return next();
  }

  res.send({ status: 401, message: 'Invalid credentials' });
}
