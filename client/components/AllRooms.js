import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchRooms, writeRoomName, postRoom} from '../store'
import {Link} from 'react-router-dom'

 class AllRooms extends Component {
   componentDidMount () {
    this.props.getRooms()
   }

   render(){
    const { rooms, newRoomEntry, handleSubmit, handleChange } = this.props;
     return (
      <div id="room-box">
        <form onSubmit={handleSubmit} className="room-box-child">
          <div className="form-group" id="create-room-box">
            <label htmlFor="name" className="create-room-child">Create a Room :</label>
            <input
              value={newRoomEntry}
              onChange={handleChange}
              type="text"
              className="create-room-child"
              name="roomName"
              placeholder="Enter room name"
            />
            <div className="form-group" className="create-room-child" id="create-room-button">
              <button type="submit" className="btn btn-default">Create Room</button>
            </div>
          </div>

        </form>
          {
            rooms.map((room) => {
              return (
                <div key={room.id} className="room-box-child">
                  <div className="card container">
                    <div className="row">
                      <div className="card-image three columns">
                        <img src="http://www.breagaghview.com/images/icons/tv.ico" />
                      </div>
                      <div className="card-artist five columns">
                        <div className="card-artist-song">{room.name}</div>
                      </div>
                      <div className="card-vote one columns">
                      <Link to={`/rooms/${room.id}`}>
                        <button className="card-control-button">
                          Join
                        </button>
                      </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
      </div>
    )
  }
 }

 const mapState = (state) => {
   return {
     rooms: state.rooms,
     newRoomEntry: state.newRoomEntry
   }
 }

 const mapDispatch = (dispatch, ownProps) => {
   return {
     getRooms: () => {
       dispatch(fetchRooms())
     },
     handleChange (evt) {
       dispatch(writeRoomName(evt.target.value))
     },
     handleSubmit (evt) {
       evt.preventDefault();
       const name = evt.target.roomName.value;
       dispatch(postRoom({ name }, ownProps.history))
       dispatch(writeRoomName(''))
    }
  }
}

export default connect(mapState, mapDispatch)(AllRooms)
