import io from 'socket.io-client'
import store, {addVideoLinkAction, setCurrentVideoAction, fetchVideos, updateVideo, setCurrentVideo, removeFirstVideo} from './store'


const socket = io(window.location.origin)

socket.on('connect', () => {

  socket.on('new-video-added', video => {
    store.dispatch(addVideoLinkAction(video));
  });

  socket.on('first-current-video', video => {
    store.dispatch(setCurrentVideoAction(video))
  })

  socket.on('vote-updte', (roomId) => {
    store.dispatch(fetchVideos(roomId))
  })

  socket.on('skip-video', (current, next) => {
    current.hasPlayed = true
    current.isCurrent = false
    store.dispatch(updateVideo(current))
    store.dispatch(setCurrentVideo(next))
    store.dispatch(removeFirstVideo())
  })

});

export default socket
