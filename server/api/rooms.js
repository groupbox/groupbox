const router = require('express').Router()
const {Room} = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  Room.findAll()
    .then(rooms => res.json(rooms))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Room.create(req.body)
    .then(room => res.json(room))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Room.findById(req.params.id)
    .then(room => res.json(room))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Room.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.sendStatus(200))
    .catch(next)
})
