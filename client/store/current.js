import axios from 'axios'
import socket from '../socket';

const SET_CURRENT_VIDEO = 'SET_CURRENT_VIDEO'

export const setCurrentVideoAction = function(video){
  return {
    type: SET_CURRENT_VIDEO,
    video
  }
}


export const setCurrentVideo = (video) => {
  return function(dispatch){
    if (video.videoId){
    video.hasPlayed = true
    video.isCurrent = true
    dispatch(setCurrentVideoAction(video))
      axios.put('/api/video/', video)
      .catch(err => console.log('setCurrentVideo error', err))
      socket.emit('first-current-video', video)
    } else {
      dispatch(setCurrentVideoAction({videoId: ''}))
    }
  }
}

export const fetchCurrentVideo = (roomId) => {
  return function(dispatch){
    axios.get(`/api/current/${roomId}`)
    .then(res => res.data)
    .then(video => {
      if (video.id) dispatch(setCurrentVideo(video))
      else dispatch(setCurrentVideo({}))
    })
    .catch(err => console.log(err))
  }
}

export default function (state = {videoId: ''}, action){
  switch (action.type) {
    case SET_CURRENT_VIDEO:
      return action.video || state
    default:
      return state
  }
}
