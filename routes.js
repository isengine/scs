import express from 'express'

const router = express.Router()

router.route('/').get((req, res) => {
  res.render('index')
})

router.route('/test').get((req, res) => {
  const response = req.t('title');
  res.status(200);
  res.send(response);
})

export default router
