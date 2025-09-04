export const createAPP = (
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
) => {
  const app = express()

  app.use(corsMiddleware())
  app.use(jsonMiddleware())
  app.use(urlencodedMiddleware())
  app.use(cookieParser(COOKIE_SECRET_KEY))

  app.set('view engine', 'ejs')
  app.set('views', 'src/views')

  app.get('/', (req, res) => {
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

    res.render('index')
  })

  app.get('/login', (req, res) => {
    res.render('login')
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

  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
  })
}
