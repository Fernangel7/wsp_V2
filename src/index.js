import { createServer } from 'node:http'
import path from 'node:path'

import express from 'express'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import axios from 'axios'

import corsMiddleware, { ACCEPTED_ORIGINS } from './middlewares/cors.js'
import jsonMiddleware from './middlewares/json.js'
import urlencodedMiddleware from './middlewares/urlencoded.js'
import { authLogin, LoggedRedirection } from './middlewares/authLogin.js'

import { chatRouter } from './routes/chat.js'
import { userRouter } from './routes/user.js'
import { createAuthRouter } from './routes/auth.js'

export const createAPP = (
  {
    JWT_SECRET_KEY,
    COOKIE_SECRET_KEY,
    PORT,
    authModel
  }
) => {
  const app = express()

  app.use(corsMiddleware())
  app.use(jsonMiddleware())
  app.use(urlencodedMiddleware())
  app.use(cookieParser(COOKIE_SECRET_KEY))

  app.use('/public', express.static('public'))

  app.use('/chat', chatRouter)
  app.use('/user', userRouter)
  app.use('/auth', createAuthRouter({ authModel }))

  app.set('view engine', 'ejs')
  app.set('views', path.join('public', 'views'))

  app.get('/', authLogin, (req, res) => {
    res.redirect('/chat')
  })

  app.get('/login', LoggedRedirection, (req, res) => {
    res.render('login')
  })

  app.get('/chat', authLogin, async (req, res) => {
    const token = req.cookies.refeshToken
    const decoded = jwt.verify(token, JWT_SECRET_KEY)
    console.log(decoded)

    io.emit('open chat service', { data: {} })
    axios.post('/chat/getChats/')

    res.render('index', { theme: ['Light', 'Dark'][1] })
  })

  app.get('/r', (req, res) => {
    res.clearCookie('refeshToken', {
      sign: true,
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    })
    res.redirect('/')
  })

  app.post('/signup', LoggedRedirection, (req, res) => {
    //  asd
  })

  const server = createServer(app)
  const io = new Server(server, {
    cors: {
      origin: ACCEPTED_ORIGINS,
      methods: ['GET']
    }
  })

  io.on('connection', (socket) => {
    console.log('Cliente Conectado')

    socket.on('open chat service', (data) => {
      console.log('inicio de chat')
      console.log('it says: ' + JSON.stringify(data))
    })
  })

  server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
  })
}
