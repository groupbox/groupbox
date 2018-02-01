import io from 'socket.io-client'
import store, {addVideoLinkAction, fetchVideos} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-video-added', videoObj => {
    store.dispatch(addVideoLinkAction(videoObj));
  });

  socket.on('first-current-video', videoId => {
    store.dispatch(setCurrentVideoAction(videoId))
  })

  socket.on('vote-updte', (roomId) => {
    store.dispatch(fetchVideos(roomId))
  })

});



export default socket
