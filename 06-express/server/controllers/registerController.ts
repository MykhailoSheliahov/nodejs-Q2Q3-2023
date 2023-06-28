import { Request, Response } from 'express'
import { debug } from 'debug'

import { dbController } from './dbController'
import { User } from '../types'

const debuglog = debug('routes:register')

export class RegisterController {
  static async register(req: Request, res: Response) {
    try {
      const { first_name, last_name, isCartOwner, email, password } = req.body.params

      if (!(email && password && first_name && last_name)) {
        debuglog('Such fields email && password && first_name && last_name are required')

        return res.send({
          statusCode: 400,
          message: 'All input is required',
        })
      }

      const oldUser = await dbController.getUser({ email })

      if (oldUser) {
        debuglog('User already exist', oldUser)

        return res.send({
          statusCode: 409,
          message: 'User Already Exist. Please Login',
        })
      }

      const user: User = {
        first_name,
        last_name,
        email: email.toLowerCase(),
        password,
        role: isCartOwner === 'true' ? 'owner' : 'reader',
      }

      dbController.createUser(user)

      debuglog('User successfully registered', user)

      return res.send({
        statusCode: 201,
        message: 'User successfully registered',
      })
    } catch (err) {
      debuglog('Error ocurred', err)

      res.send({
        statusCode: 500,
        message: 'Internal Server Error',
      })
    }
  }
}
