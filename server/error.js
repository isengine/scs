import dotenv from 'dotenv'

dotenv.config()

const isDev = process.env.NODE_ENV === 'dev'

export default (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = isDev ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
}
