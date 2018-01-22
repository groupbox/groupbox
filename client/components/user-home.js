import React, {Component} from 'react'
import {connect} from 'react-redux'
import Queue from './Queue'
import Search from './Search'
import {NavLink} from 'react-router-dom'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props){
    super(props)
    this.state = {
      view: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(evt){
    if (evt.target.innerHTML === 'now playing: '){
      this.setState({view: true})
    } else if (evt.target.innerHTML === 'search: '){
      this.setState({view: false})
    }
  }

  render(){

    return (
      <div>
        <div className="container">
          <div className="container">
            <div className="main-nav">
              <div className="row">
                <NavLink to="/home">
                  <h5 onClick={this.handleClick} className="main-nav-text nine columns">now playing: </h5>
                </NavLink>
                <NavLink to="/home">
                  <h5 onClick={this.handleClick} className="main-nav-text three columns">search: </h5>
                </NavLink>
              </div>
            </div>
            {
              this.state.view ?
              ( <Queue /> ) : ( <Search /> )
            }
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
