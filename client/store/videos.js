import axios from 'axios';
//var fetchVideoInfo = require('youtube-info');

const ADD_VIDEO_LINK = 'ADD_VIDEO_LINK'
const REMOVE_FIRST_VIDEO = 'REMOVE_FIRST_VIDEO'

//ACTIONS
export const addVideoLinkAction = function(videoObj){
    return {
        type: ADD_VIDEO_LINK,
        videoObj
    }
}


//DISPATCHER
export function addVideoLinkDispatch(videoLink){
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
          return axios.post('/api/video', videoObj)
        })
        .then(createdVideo => dispatch(addVideoLinkAction(createdVideo)))
        .catch(error => console.log(error))
        .catch(error => console.log(error))
    }
}



//REDUCER
export default function videosReducer(state = [], action){
    switch (action.type){
        case ADD_VIDEO_LINK:
            return [...state, action.videoObj];
        case REMOVE_FIRST_VIDEO:
            return state.slice(1)
        default:
            return state;
    }

}
