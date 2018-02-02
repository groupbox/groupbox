import React, {Component} from 'react'
import {connect} from 'react-redux'
import Queue from './Queue'
import {fetchRoom, fetchVideos} from '../store'

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
    currentRoom: state.currentRoom
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCurrentRoom(id){
      dispatch(fetchRoom(id))
      dispatch(fetchVideos(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)
