const db = require('../db')
const Sequelize = require('sequelize')

const Room = db.define('room', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUID
  }
})

module.exports = Room
