import React, {Component} from 'react'
import {connect} from 'react-redux'
import Queue from './Queue'
import Search from './Search'
import {NavLink} from 'react-router-dom'
import {fetchRoom} from '../store'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    this.props.fetchCurrentRoom(this.props.match.params.id)
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
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)
