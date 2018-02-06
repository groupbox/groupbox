import io from 'socket.io-client'
import store, {addVideoLinkAction, setCurrentVideoAction, fetchVideos} from './store'


const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-video-added', video => {
    store.dispatch(addVideoLinkAction(video));
  });

  socket.on('first-current-video', video => {
    store.dispatch(setCurrentVideoAction(video))
  })

  socket.on('vote-updte', (roomId) => {
    store.dispatch(fetchVideos(roomId))
  })

});

export default socket
