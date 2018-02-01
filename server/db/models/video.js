const db = require('../db')
const Sequelize = require('sequelize')
const youtubeId = require('youtube-id')

const Video = db.define('video', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING
  },
  videoId: {
    type: Sequelize.STRING,
    allowNull: false,
    set: function(url){
      let id = youtubeId(url)
      if (id) this.setDataValue('videoId', id)
      else this.setDataValue('videoId', url)
    }
  },
  thumbnail: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.stack.imgur.com/WFy1e.jpg'
  },
  vote: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  hasPlayed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Video
