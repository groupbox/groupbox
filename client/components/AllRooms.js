import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchRooms} from '../store'
import {Link} from 'react-router-dom'

 class Room extends Component {
   constructor(props){
     super(props);
     this.state = {}
   }

   componentDidMount () {
    this.props.getRooms()
   }

   render(){
    const { rooms } = this.props;
    console.log(rooms)
     return (
      <div>
        {
          <ul>
          {
            rooms.map((room) => {
              return (
                <li key={room.id}>
                  <Link to={`/rooms/${room.id}`}>{room.name}</Link>
                </li>

              )
            })
          }
          </ul>
        }
      </div>
     )
   }
 }

 const mapState = (state) => {
   return {
     rooms: state.rooms
   }
 }

 const mapDispatch = (dispatch) => {
   return {
     getRooms: () => {
       dispatch(fetchRooms())
     }
   }
 }

export default connect(mapState, mapDispatch)(Room)
