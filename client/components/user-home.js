import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {vote} from '../store'
import FlipMove from 'react-flip-move'

const audio = document.createElement('audio');
// const source = 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3';
// audio.load();

/**
 * COMPONENT
 */
class UserHome extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    const {email, songs, upvoteSong, downvoteSong, current} = this.props

    return (
      <div>
        <div className="container">
          <div className="container">
            <h3>Welcome, {email}</h3>
            <div>Current Song: {current.name}</div>
            <audio controls>
              <source src={null} />
            </audio>
            <FlipMove duration={750}>
              {
                songs.map(song => (
                  <div className="card container" key={song.id} >
                    <div className="row">
                      <div className="card-image three columns">
                        <img src="images/abbey-road.jpeg" />
                      </div>
                      <div className="card-artist five columns">
                        <div className="card-artist-song">{ song.name }</div>
                        <div className="card-artist-name">
                          <div>{ song.artists ? song.artists.map(artist => artist.name).join(', ') : null }</div>
                        </div>
                      </div>
                      <div className="card-vote one columns">
                        <div className="card-vote-amt">{ song.vote }</div>
                      </div>
                      <div className="card-control three columns">
                        <div>
                          <button className="card-control-button" onClick={() => upvoteSong(song)}>↑</button>
                        </div>
                        <div>
                          <button className="card-control-button" onClick={() => downvoteSong(song)}>↓</button>
                        </div>
                      </div>
                    </div>
                  </div>
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
