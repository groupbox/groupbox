'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Video = db.define('video', {
    link: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
);

module.exports = Video;
