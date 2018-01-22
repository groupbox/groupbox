import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {vote} from '../store'
import Queue from './Queue'
import Search from './Search'
// import { NavLink, Switch, Router } from 'react-router-dom'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props){
    super(props)
    this.state = {
      view: 'Queue'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(evt){
    if (evt.target.name === 'now playing: '){
      this.setState({view: 'Queue'})
    } else if (evt.target.name === 'search: '){
      this.setState({view: 'Search'})
    }
  }

  render(){

    return (
      <div>
        <div className="container">
          <div className="container">
            <div className="main-nav">
              <div className="row">
                <h5 onClick={this.handleClick} name="queue" className="main-nav-text nine columns">now playing: </h5>
                <h5 onClick={this.handleClick} name="search" className="main-nav-text three columns">search: </h5>
              </div>
            </div>
            {
              this.state.view === 'Queue' ?
              <Queue /> : <Search />
            }
            <Search />
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

const mapDispatch = null

export default connect(mapState, mapDispatch)(UserHome)
