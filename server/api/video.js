const router = require('express').Router()
const { Video } = require('../db/models')

router.post('/', (req, res, next) => {
  Video.create(req.body)
  .then(video => res.json(video))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  Video.findAll({
    where: {
      roomId: req.params.id
    }
  })
  .then(videos => res.json(videos))
  .catch(next)
})

module.exports = router
