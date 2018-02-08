import React, {Component} from 'react'
import {connect} from 'react-redux'
import Queue from './Queue'
import socket from '../socket';
import {fetchRoom, fetchVideos, fetchCurrentVideo} from '../store'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props){
    super(props)
    this.state = {
      show: true
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    let roomId = this.props.match.params.id
    this.props.fetchCurrentRoom(roomId)
    socket.emit('room-joined', roomId)
  }

  handleClick () {
    if (!this.state.show) {
      this.setState({
        show: true
      })
    } else {
      this.setState({
        show: false
      })
    }

  }

  render(){
    const { currentRoom } = this.props
    return (
      <div className="container">
        <div id="room-name-container">
        <h1 className="spacetext">{currentRoom.name}</h1>
        <div id="toggle-video-container">
          <h6>{this.state.show ? 'Hide Video:' : 'Show Video:'}</h6>
          <label id="toggle-video" className="switch">
            <input type="checkbox" />
            <span className="slider round" onClick={this.handleClick} />
          </label>
        </div>
        </div>
        <Queue show={this.state.show} />
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
    current: state.current,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCurrentRoom(roomId){
      dispatch(fetchRoom(roomId))
      dispatch(fetchVideos(roomId))
      dispatch(fetchCurrentVideo(roomId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)
