import { urlencoded } from 'express'

const urlencodedMiddleware = () => urlencoded(
  {
    extended: true,
    limit: '100kb',
    inflate: false,
    parameterLimit: 100
  }
)

export default urlencodedMiddleware
