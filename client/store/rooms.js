import axios from 'axios'

 const GET_ROOMS = 'GET_ROOMS'
 const DELETE_ROOM = 'DELETE_ROOM'

 const getRooms = rooms => ({type: GET_ROOMS, rooms})
 const deleteRoom = rooms => ({type: DELETE_ROOM, rooms})

 let initialRooms = []

 export const destroyRoom = (roomId) =>
  dispatch => {

    axios.delete(`/api/rooms/${roomId}`)
    .then(() => {
      let newRooms = initialRooms.filter((room) => {
        return room.id !== roomId
      })
      dispatch(deleteRoom(newRooms))
      //socket emit goes here to show room was deleted
    })
    .catch(err => console.error(err))
}

 export const fetchRooms = () =>
 dispatch => {
    axios.get('/api/rooms')
    .then(res => {
      dispatch(getRooms(res.data || initialRooms))
    })
    .catch(err => console.error(err))
   }

 export default function (state = initialRooms, action) {
   switch (action.type) {
     case GET_ROOMS:
       return action.rooms
     case DELETE_ROOM:
       return action.rooms
     default:
       return state
   }
 }
