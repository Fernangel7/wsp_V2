import { json } from 'express'

const jsonMiddleware = () => json(
  {
    limit: '100kb',
    strict: true,
    inflate: false,
    type: ['application/json'],
    defaultCharset: 'utf-8'
  }
)

export default jsonMiddleware
