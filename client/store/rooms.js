import axios from 'axios'

 const GET_ROOMS = 'GET_ROOMS'

 const getRooms = rooms => ({type: GET_ROOMS, rooms})


 let initialRooms = []

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
     default:
       return state
   }
 }
