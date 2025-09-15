import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import corsMiddleware, { ACCEPTED_ORIGINS } from './middlewares/cors.js'
import jsonMiddleware from './middlewares/json.js'
import urlencodedMiddleware from './middlewares/urlencoded.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

export const createAPP = (
  {
    JWT_SECRET_KEY,
    COOKIE_SECRET_KEY,
    PORT,
    userModel
  }
) => {
  const app = express()

  app.use(corsMiddleware())
  app.use(jsonMiddleware())
  app.use(urlencodedMiddleware())
  app.use(cookieParser(COOKIE_SECRET_KEY))
  app.use('/public', express.static('public'))

  app.set('view engine', 'ejs')
  app.set('views', 'public/views')

  app.get('/', (req, res) => {
    authLogin(req, res)

    res.redirect('/chat')
  })

  app.get('/login', (req, res) => {
    res.render('login')
  })

  app.get('/chat', (req, res) => {
    authLogin(req, res)

    io.emit('open chat service', { data: {} })

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

  app.post('/signin', (req, res) => {
    res.cookie('refeshToken', jwt.sign({
      ...req.body
    }, JWT_SECRET_KEY), {
      sign: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: true,
      sameSite: 'Strict'
    })

    res.redirect('/')
  })

  app.post('/signup', (req, res) => {
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

  const authLogin = (req, res) => {
    const token = req.cookies.refeshToken

    if (!token) {
      res.redirect('/login')
    }

    try {
      if (!jwt.verify(token, JWT_SECRET_KEY)) {
        res.redirect('/login')
      }
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
