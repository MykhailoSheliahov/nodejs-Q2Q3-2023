import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { debug } from 'debug'

import { User } from '../types'

const debuglog = debug('verifyToken')

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    debuglog('Token is missed', authHeader)

    return res.send({
      statusCode: 401,
      message: 'Token is required',
    })
  }

  const [tokenType, token] = authHeader.split(' ')

  if (tokenType !== 'Bearer') {
    debuglog('Invalid token type', tokenType)

    return res.send({
      statusCode: 403,
      message: 'Invalid Token',
    })
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as User
    req.query.user = user as unknown as string
  } catch (err) {
    debuglog('Error ocurred', err)

    return res.send({
      statusCode: 400,
      message: 'Invalid Token',
    })
  }
  return next()
}
