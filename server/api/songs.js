const router = require('express').Router()
const {Song, Artist} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Song.findAll({include: [{model: Artist}]})
  .then(songs => res.json(songs))
  .catch(next)
})

router.put('/', (req, res, next) => {
  Song.findById(req.body.id)
  .then(song => song.update(req.body))
  .then(song => res.send(song))
  .catch(next)
})
