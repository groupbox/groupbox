const router = require('express').Router()
const { Video } = require('../db/models')

router.post('/', (req, res, next) => {
  Video.create(req.body)
  .then(video => res.json(video))
  .catch(next)
})

module.exports = router
