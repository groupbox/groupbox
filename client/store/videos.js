import axios from 'axios';
import { vote } from './index';
const ADD_VIDEO_LINK = 'ADD_VIDEO_LINK'
const REMOVE_FIRST_VIDEO = 'REMOVE_FIRST_VIDEO'
const GET_VIDEOS = 'GET_VIDEOS'
const MODIFY_VOTE = 'MODIFY_VOTE'


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

export const modifyVideoVoteAction = function(videoId, vote){
    return {
        type: MODIFY_VOTE,
        vote,
        videoId
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
        .then(res => dispatch(addVideoLinkAction(res.data)))
        .catch(error => console.log(error))
    }
}


export function fetchVideos (roomId) {
    return function thunk(dispatch) {
        axios.get(`/api/video/${roomId}`)
            .then(res => res.data)
            .then(videos => {
                dispatch(getVideos(videos))
            })
            .catch(error => console.log(error))
    }
}

export function modifyVideoVoteDispatcher(videoId, vote){
    return function thunk(dispatch){
        dispatch(modifyVideoVoteAction(videoId, vote))
    }
}

//UTILITY
function sortComparator(objA, objB){
    let comparison = 0
    if( objA.vote > objB.vote)
        comparison = -1
    else if( objB.vote > objA.vote )
        comparison = 1
    return comparison;
}


//REDUCER
export default function videosReducer(state = [], action){
    switch (action.type){
        case ADD_VIDEO_LINK:
            let newVideoArr = [...state, action.videoObj];
            newVideoArr.sort(sortComparator)
            return newVideoArr;
        case REMOVE_FIRST_VIDEO:
            return state.slice(1)
        case GET_VIDEOS:
            return action.videos
        case MODIFY_VOTE:
            let tempVideoArr = state.map(video => {
                if(video.videoId === action.videoId)
                    return Object.assign({}, video, {vote: video.vote + action.vote})
                return video
            })
            tempVideoArr.sort(sortComparator)
            return tempVideoArr;
        default:
            return state;
    }

}
