import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import createError from 'http-errors'
import express from 'express'
import i18nextMiddleware from 'i18next-http-middleware'
import hbs from '#server/hbs.js'
import i18next from '#server/i18next.js'
import routes from '#server/routes'

dotenv.config()

const server = express()

const isDev = process.env.NODE_ENV === 'dev'
const port = process.env.PORT || 8080

if (isDev) server.use(morgan('dev'))

server
  .use(cors())
  .use(express.json())
  .use(i18nextMiddleware.handle(i18next))
  .use('', routes)
  .use(express.static('./static'))
  .set('views', `./view${process.env.TEMPLATE}/`)

  // set handlebars
  .set('view engine', 'html')
  .engine('html', hbs.__express)

  // catch 404 and forward to error handler
  .use((req, res, next) => {
    next(createError(404))
  })

  // error handler
  .use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = isDev ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

server.listen(
  port,
  console.log(
    'Server running \n'.bold,
    'in ' +
      (isDev ? 'development' : 'production').yellow +
      ' mode on ' +
      port.yellow +
      ' port\n',
    'at ' + `http://localhost:${port}`.bold
  )
)
