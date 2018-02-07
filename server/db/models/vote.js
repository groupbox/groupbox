const db = require('../db')
const Sequelize = require('sequelize')

const Vote = db.define('vote', {
  vote: {
    type: Sequelize.ENUM,
    values: ['up', 'down', 'skip']
  }
})

module.exports = Vote
