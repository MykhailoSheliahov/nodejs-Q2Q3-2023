import { NextFunction, Request, Response } from 'express';
import { logger } from '../logging';

const getDurationInMilliseconds = (start: bigint) =>
  Number(process.hrtime.bigint() - start) / 1e6;

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.originalUrl} [STARTED]`);
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: '[FINISHED]',
      durations: `${getDurationInMilliseconds(start)} ms`,
    })
  });

  res.on('error', (err) => {
    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: '[Error]',
      err,
    });
  });

  next();
};
