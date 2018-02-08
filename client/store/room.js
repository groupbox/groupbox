import axios from 'axios'
import socket from '../socket'

const GET_ROOM = 'GET_ROOM'
const EDIT_ROOM = 'EDIT_ROOM'

const getRoom = room => ({type: GET_ROOM, room})
const editRoom = room => ({type: EDIT_ROOM, room})

let initialRoom = {}

export const fetchRoom = (roomId) =>
  dispatch => {
    axios.get(`/api/rooms/${roomId}`)
    .then(res => {
      dispatch(getRoom(res.data || initialRoom))
    })
    .catch(err => console.error(err))
}

export const postRoom = (room, history) => {
  return function thunk (dispatch) {
    return axios.post('/api/rooms', room)
      .then(res => res.data)
      .then(newRoom => {
        dispatch(getRoom(newRoom));
        socket.emit('newRoom');
        history.push(`/rooms/${newRoom.id}`);
      });
  };
}

export const editCurrentRoom = (room) => {
  return function(dispatch){
    dispatch(editRoom(room))
  }
}


export default function (state = initialRoom, action) {
  switch (action.type) {
    case GET_ROOM:
      return action.room
    case EDIT_ROOM:
      return action.room
    default:
      return state
  }
}
