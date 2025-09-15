import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../config.js'

export const authLogin = (req, res, next) => {
  const token = req.cookies.refeshToken

  if (!token) {
    res.redirect('/login')
  } else {
    try {
      if (!jwt.verify(token, JWT_SECRET_KEY)) {
        res.redirect('/login')
      } else next()
    } catch (e) {
      res.clearCookie('refeshToken', {
        sign: true,
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
      })
      res.redirect('/login')
    }
  }
}

export const LoggedRedirection = (req, res, next) => {
  const token = req.cookies.refeshToken
  if (token) {
    try {
      if (jwt.verify(token, JWT_SECRET_KEY)) {
        res.redirect('/chat')
      } else next()
    } catch (e) {
      res.clearCookie('refeshToken', {
        sign: true,
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
      })
      next()
    }
  } else next()
}
