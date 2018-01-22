import React, {Component} from 'react';
import {connect} from 'react-redux'
import {vote} from '../store'

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    const {song, upvoteSong, downvoteSong} = this.props
    return (
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
    )
  }
}

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

export default connect(mapState, mapDispatch)(Card)
