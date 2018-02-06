const router = require('express').Router()
const { Vote } = require('../db/models')

router.get('/:id', (req, res, next) => {
  Vote.findAll({
    where: {
      userId: req.params.id
    }
  })
  .then(votes => res.json(votes))
  .catch(next)
})

router.put('/', (req, res, next) => {
  Vote.findOrCreate({
    where: {
      userId: req.body.userId,
      videoId: req.body.videoId
    }
  })
  .spread((vote, created) => {
    console.log(created)
    return vote.update({vote: req.body.vote})
  })
  .then(vote => res.send(vote))
  .catch(next)
})

module.exports = router
