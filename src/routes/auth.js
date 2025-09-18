import { Router } from 'express'

import { LoggedRedirection } from '../middlewares/authLogin.js'

import { AuthController } from '../controllers/auth.js'

export const createAuthRouter = ({ authModel }) => {
  const auth = new AuthController({ authModel })

  const app = Router()

  app.post('/signin', LoggedRedirection, auth.signIn({ authModel }))
}
