import axios from 'axios';
import socket from '../socket';
import {setCurrentVideo} from './current'

const ADD_VIDEO_LINK = 'ADD_VIDEO_LINK'
const REMOVE_FIRST_VIDEO = 'REMOVE_FIRST_VIDEO'
const GET_VIDEOS = 'GET_VIDEOS'
const EDIT_VIDEO = 'EDIT_VIDEO'


//ACTIONS
export const addVideoLinkAction = function(videoObj){
    return {
        type: ADD_VIDEO_LINK,
        videoObj
    }
}

export const getVideos = function(videos){
    return {
        type: GET_VIDEOS,
        videos
    }
}

export const editVideoAction = function(video) {
    return {
        type: EDIT_VIDEO,
        video
    }
}

export const removeFirstVideo = function(){
  return {
    type: REMOVE_FIRST_VIDEO
  }
}


//DISPATCHER
export function addNewVideo(videoLink, roomId, current){
    return function thunk(dispatch){
        let proxy = 'https://cors-anywhere.herokuapp.com/'
        let oembed = 'https://www.youtube.com/oembed?format=json&url='
        //url is the variable that will change
        let url = videoLink;
        let videoObj = {};
        axios.get(proxy + oembed + url)
        .then(response => {
          let data = response.data;
          videoObj.author = data.author_name;
          videoObj.title = data.title;
          videoObj.thumbnail = data.thumbnail_url;
          videoObj.videoId = url;
          videoObj.vote = 0;
          videoObj.roomId = roomId
          socket.emit('new-video-added', videoObj)
          return axios.post('/api/video', videoObj)
        })
        .then(res => {
          if (!current.videoId) dispatch(setCurrentVideo(res.data))
          else dispatch(addVideoLinkAction(res.data))})
        .catch(error => console.log(error))
    }
}


export function fetchVideos (roomId) {
    return function thunk(dispatch) {
        axios.get(`/api/video/${roomId}`)
            .then(res => res.data)
            .then(videos => {
                let current = (videos.length > 0) ? videos.shift() : {videoId: ''}
                dispatch(getVideos(videos))
                dispatch(setCurrentVideo(current))
            })
            .catch(error => console.log(error))
    }
}

export function updateVideo(video){
    return function thunk(dispatch){
      axios.put('/api/video', video)
      .then(res => dispatch(editVideoAction(res.data)))
      .then(() => dispatch(fetchVideos(video.roomId)))
      .then(() => socket.emit('vote-updte', video.roomId))
      .catch(err => console.log('updateVote error', err))
    }
}


//REDUCER
export default function videosReducer(state = [], action){
    switch (action.type){
        case ADD_VIDEO_LINK:
            return [...state, action.videoObj];
        case REMOVE_FIRST_VIDEO:
            return state.slice(1)
        case GET_VIDEOS:
            return action.videos
        default:
            return state;
    }

}
