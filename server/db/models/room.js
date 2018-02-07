const db = require('../db')
const Sequelize = require('sequelize')

const Room = db.define('room', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  users: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Room
