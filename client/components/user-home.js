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
    this.state = {
      show: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    let roomId = this.props.match.params.id
    this.props.fetchCurrentRoom(roomId)
  }

  handleClick () {
    if(!this.state.show) {
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
        <label id="toggle-video" className="switch">
          <input type="checkbox" />
          <span className="slider round" onClick={this.handleClick} />
        </label>
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
