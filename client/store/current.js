import socket from '../socket';
import {updateVideo} from './videos'

const SET_CURRENT_VIDEO = 'SET_CURRENT_VIDEO'

export const setCurrentVideoAction = function(videoId){
  return {
    type: SET_CURRENT_VIDEO,
    videoId
  }
}

export const setCurrentVideo = (video) => {
  return function(dispatch){
    dispatch(setCurrentVideoAction(video))
    socket.emit('first-current-video', video)
  }
}


export default function (state = '', action){
  switch (action.type) {
    case SET_CURRENT_VIDEO:
      //return action.videoId || state
      return action.videoId || ''
    default:
      return state
  }
}
