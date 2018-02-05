const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/rooms', require('./rooms'))
router.use('/video', require('./video'))
router.use('/current', require('./current'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
