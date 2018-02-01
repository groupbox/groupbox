module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('new-video-added', (videoObj) => {
      console.log('new-video-added!!!!!!', videoObj)
      socket.broadcast.emit('new-video-added', videoObj);
    })

    socket.on('first-current-video', (videoId) => {
      console.log('first-current-video!!!!!!', videoId)
      socket.broadcast.emit('first-current-video', videoId);
    })

    socket.on('testing', (data) => {
      console.log('Yaaaaaaaa testing worked!!!!!!', data)
    })


  })
}
