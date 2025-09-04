import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import corsMiddleware from '../middlewares/cors.js'
import jsonMiddleware from '../middlewares/json.js'
import urlencodedMiddleware from '../middlewares/urlencoded.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import { PORT, JWT_SECRET_KEY, COOKIE_SECRET_KEY } from '../config.js'
import { createAPP } from '../index.js'

createAPP(
  {
    express,
    createServer,
    Server,
    corsMiddleware,
    jsonMiddleware,
    urlencodedMiddleware,
    cookieParser,
    jwt,
    JWT_SECRET_KEY,
    COOKIE_SECRET_KEY,
    PORT
  }
)
