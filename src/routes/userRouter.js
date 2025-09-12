import { Router } from 'express'
const app = Router()

app.post('/login', (req, res) => {
  res.json('User route')
})

export { app as userRouter }
