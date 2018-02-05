'use strict';
const User = require('./user')
const Room = require('./room')
const Video = require('./video');
const Vote = require('./vote');

Room.hasMany(Video)
Video.belongsTo(Room)
Vote.belongsTo(User)
Vote.belongsTo(Video)

module.exports = {
  User,
  Video,
  Room,
  Vote
};
