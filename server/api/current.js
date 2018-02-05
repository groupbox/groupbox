const router = require('express').Router()
const { Video } = require('../db/models')

router.get('/:id', (req, res, next) => {
  Video.findOne({
    where: {
      roomId: req.params.id,
      isCurrent: true
    }
  })
  .then(video => res.send(video))
  .catch(next)
})

module.exports = router
