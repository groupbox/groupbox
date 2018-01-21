import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {vote} from '../store'
import FlipMove from 'react-flip-move'
import Queue from './queue'

const AUDIO = document.createElement('audio');

/**
 * COMPONENT
 */
class UserHome extends Component {

  constructor(props){
    super(props);
    this.state = {
      prev: null,
      isPlaying: true,
      toggle: 'Pause'
    }
    this.toggle = this.toggle.bind(this);
  }

  componentDidUpdate(){
    if (this.state.prev !== this.props.current.id){
      this.setState({
        prev: this.props.current.id
      })
      this.props.load(this.props.current)
    }
  }

  toggle(){
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  pause(){
    AUDIO.pause()
    this.setState({ isPlaying: false, toggle: 'Play' });
  }

  play(){
    AUDIO.play()
    this.setState({ isPlaying: true, toggle: 'Pause' });
  }

  render(){
    const {email, songs, current } = this.props

    return (
      <div>
        <div className="container">
          <div className="container">
            <h5>Now Playing: </h5>
            <Queue song={current} />
            <div className="toggle">
              <button onClick={this.toggle}>{this.state.toggle}</button>
            </div>
            <FlipMove duration={750}>
              {
                songs.map(song => (
                <Queue key={song.id} song={song} />
                ))
              }
            </FlipMove>
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
    upvoteSong (song) {
      song.vote += 1
      dispatch(vote(song))
    },
    downvoteSong (song) {
      song.vote -= 1
      dispatch(vote(song))
    },
    load(current){
      AUDIO.src = current.audioUrl
      AUDIO.load()
      AUDIO.play()
      .catch(error => console.error(error))
    }

  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
