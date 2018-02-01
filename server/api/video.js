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
    },
    order: [
      ['vote', 'DESC'],
      ['updatedAt']
    ]
  })
  .then(videos => res.json(videos))
  .catch(next)
})

router.put('/', (req, res, next) => {
  Video.findById(req.body.id)
  .then(video => video.update(req.body))
  .then(video => res.send(video))
  .catch(next)
})

module.exports = router
