'use strict';
const User = require('./user')
const Room = require('./room')
const Video = require('./video');

Room.hasMany(Video)
Video.belongsTo(Room)
Room.belongsToMany(User, { through: 'userRoom' })
User.belongsToMany(Room, { through: 'userRoom' })

module.exports = {
  User,
  Video,
  Room
};
