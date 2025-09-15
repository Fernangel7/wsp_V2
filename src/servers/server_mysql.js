import 'dotenv/config'
import { userModel } from '../models/mysql/user.js'

import { PORT, JWT_SECRET_KEY, COOKIE_SECRET_KEY } from '../config.js'
import { createAPP } from '../index.js'

createAPP(
  {
    JWT_SECRET_KEY,
    COOKIE_SECRET_KEY,
    PORT,
    userModel
  }
)
