import express from 'express'
import render from '#server/ejs'

const router = express.Router()

router.route('/').get(render)
router.route('/page').get(render)
router.route('/folder/inner_page').get((req, res, next) => {
  render(req, res, next, 'default')
})

router.route('/test').get((req, res) => {
  const response = req.t('title')
  res.status(200)
  res.send(response)
})

export default router
