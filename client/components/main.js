import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import socket from '../socket'

const Main = (props) => {
  const {children, handleClick, isLoggedIn, handleLeave, email } = props

  return (
    <div>
      <div className="container">

      <nav>
      {
        isLoggedIn
          ? <div className="nav-container">
                {/* The navbar will show these links after you log in */}
                <div className="nav-welcome">
                  <h5 id="welcome-message">Welcome, {email}</h5>
                </div>
                <Link to={'/rooms'}>
                  <div id="logo">groupbox</div>
                </Link>
                <div className="nav-links">
                  <Link to="/rooms" onClick={handleLeave}>Rooms</Link>
                  <a href="#" onClick={handleClick}>Logout</a>
                </div>
            </div>
          : <div className="nav-container">
            {/* The navbar will show these links before you log in */}
            <div className="nav-welcome" />
                <Link to={'/rooms'}>
                  <div id="logo">groupbox</div>
                </Link>
            <div className="nav-links">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
      }
    </nav>
      <hr />

    </div>
      {children}
    </div>

  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email,
    currentRoom: state.currentRoom,
    handleLeave: function(){
      socket.emit('room-left', state.currentRoom.id)
    }
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
