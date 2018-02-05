import React, {Component} from 'react'
import {connect} from 'react-redux'
import Queue from './Queue'
import {fetchRoom, fetchVideos, fetchCurrentVideo} from '../store'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    let roomId = this.props.match.params.id
    this.props.fetchCurrentRoom(roomId)
  }

  render(){
    const { currentRoom } = this.props
    return (
      <div className="container">
        <div id="room-name-container">
        <h1 className="spacetext">{currentRoom.name}</h1>
        </div>
        <Queue />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    currentRoom: state.currentRoom,
    current: state.current
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCurrentRoom(roomId, current){
      dispatch(fetchRoom(roomId))
      dispatch(fetchVideos(roomId, current))
      dispatch(fetchCurrentVideo(roomId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)
