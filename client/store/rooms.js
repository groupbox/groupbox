import axios from 'axios'

 const GET_ROOMS = 'GET_ROOMS'

 const getRooms = rooms => ({type: GET_ROOMS, rooms})

 export const destroyRoom = (roomId) =>
  dispatch => {
    axios.delete(`/api/rooms/${roomId}`)
    .then(() => axios.get('/api/rooms'))
    .then(res => dispatch(getRooms(res.data)))
    .catch(err => console.error(err))
}

 export const fetchRooms = () =>
 dispatch => {
    axios.get('/api/rooms')
    .then(res => {
      dispatch(getRooms(res.data))
    })
    .catch(err => console.error(err))
   }

 export default function (state = [], action) {
   switch (action.type) {
     case GET_ROOMS:
       return action.rooms
     default:
       return state
   }
 }
