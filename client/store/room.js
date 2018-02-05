import axios from 'axios'
import socket from '../socket'

const GET_ROOM = 'GET_ROOM'

const getRoom = room => ({type: GET_ROOM, room})

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
        // ADD SOCKET EMIT EVENT HERE
        history.push(`/rooms/${newRoom.id}`);
      });
  };
}


export default function (state = initialRoom, action) {
  switch (action.type) {
    case GET_ROOM:
      return action.room
    default:
      return state
  }
}
