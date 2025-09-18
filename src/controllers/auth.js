import jwt from 'jwt'

import { JWT_SECRET_KEY } from '../config.js'
import authModel from '../models/mysql/auth.js'

class AuthController {
  constructor ({ authModel }) {
    this.authModel = authModel
  }

  static async signIn (req, res) {
    const body = req.body
    const username = body.username
    const password = body.password

    console.log(body)
    console.log(username)
    console.log(password)

    if (!req.body) {
      return res.json({
        data: {
          status: 'Error!',
          message: 'No data provided'
        }
      })
    }

    if (!username) {
      return res.json({
        data: {
          status: 'Error!',
          message: 'No username provided'
        }
      })
    }

    if (!password) {
      return res.json({
        data: {
          status: 'Error!',
          message: 'No password provided'
        }
      })
    }

    // verify info process
    const response = await authModel.signin(username, password)

    if (!response.response) {
      return res.json({
        data: {
          status: 'Error!',
          message: 'The username or password is incorrect'
        }
      })
    }

    res.cookie('refeshToken', jwt.sign({
      data: { ...response.data }
    }, JWT_SECRET_KEY), {
      sign: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: true,
      sameSite: 'Strict'
    })

    return res.json({ status: 'Success!' })
  }
}

export default AuthController
