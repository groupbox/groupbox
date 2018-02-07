const { Room } = require('../db/models')

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('room-joined', (roomId) => {
      console.log('joining room: ', roomId)
      socket.join(roomId)
      Room.findById(roomId)
      .then(room => {
        room.users++
        room.update(room.dataValues)
      })
      .catch(err => console.log(err))
    })

    socket.on('room-left', (roomId) => {
      console.log('leaving room: ', roomId)
      socket.leave(roomId)
      Room.findById(roomId)
      .then(room => {
        room.users--
        room.update(room.dataValues)
      })
      .catch(err => console.log(err))
    })

    socket.on('skip-pressed', (current, next) => {
      let room = io.sockets.adapter.rooms[current.roomId]
      if (current.vote >= room.length / 2){
        console.log('skip okay')
        io.in(current.roomId).emit('skip-video', current, next)
      } else {
        console.log('no skip yet')
      }
    })

    socket.on('new-video-added', (video) => {
      console.log('new-video-added: ', video)
      socket.broadcast.to(video.roomId).emit('new-video-added', video);
    })

    socket.on('first-current-video', (video) => {
      console.log('first-current-video: ', video)
      socket.broadcast.to(video.roomId).emit('first-current-video', video);
    })

    socket.on('vote-updte', (roomId) => {
      console.log('vote-updte!!!!! - roomId: ', roomId)
      socket.broadcast.to(roomId).emit('vote-updte', roomId);
    })

    socket.on('testing', (data) => {
      console.log('Yaaaaaaaa testing worked!!!!!!', data)
    })


  })
}
