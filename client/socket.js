import io from 'socket.io-client'
import store, {addVideoLinkAction} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-video-added', videoObj => {
    store.dispatch(addVideoLinkAction(videoObj));
  });

});



export default socket
