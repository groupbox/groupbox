'use strict';

const db = require('../db');
const Sequelize = require('sequelize')

const Room = db.define('room', {
  name: {
    type: Sequelize.STRING(1e4), // eslint-disable-line new-cap
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  }
});

module.exports = Room;
