module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('room-joined', (roomId) => {
      console.log('joining room: ', roomId)
      socket.join(roomId)
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
