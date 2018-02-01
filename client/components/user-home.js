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

    return (
      <div>
        <div className="container">
          <div className="container">
            <div className="main-nav">
              <div className="row">
                <h5 onClick={this.handleClick} className="main-nav-text nine columns">now playing: </h5>
              </div>
            </div>
            <Queue />
          </div>
        </div>
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
    songs: state.songs,
    current: state.current
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
