const db = require('../db')
const Sequelize = require('sequelize')

const Vote = db.define('vote', {
  vote: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Vote
