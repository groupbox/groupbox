import React, {Component} from 'react';
import {connect} from 'react-redux'
import {vote, addToPlaylist} from '../store'

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    const {video, upvoteSong, downvoteSong, type, addSong} = this.props
    console.log('qqqqqqqqqqqqqqqqqq', video);
    let title;
    if( typeof video === 'undefined' ) title = ''
    else title = video.title;

    let thumbnail_url;
    if( typeof video === 'undefined' ) thumbnail_url = ''
    else thumbnail_url = video.thumbnail_url;


    return (
      <div className="card container" >
        <div className="row">
          <div className="card-image three columns">
            <img src={thumbnail_url} />
          </div>
          <div className="card-artist five columns">
            <div className="card-artist-song">{title}</div>
            <div className="card-artist-name">
              <div>video poster XXXXX</div>
            </div>
          </div>
          <div className="card-vote one columns">
            <div className="card-vote-amt">vote XXXXX</div>
          </div>
          {
            type ? (
              <div className="card-control three columns">
                <div>
                  <button className="card-control-button" onClick={() => upvoteSong(song)}>↑</button>
                </div>
                <div>
                  <button className="card-control-button" onClick={() => downvoteSong(song)}>↓</button>
                </div>
              </div>
            ) : (
              <div className="card-control three columns">
                <div>
                  <button className="card-control-button-add" onClick={(evt) => addSong(song, evt)}>+</button>
                </div>
              </div>
            )
          }
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
    },
    addSong(song, evt) {
      evt.target.innerHTML =  '✔'
      dispatch(addToPlaylist(song))
    }
  }
}

export default connect(mapState, mapDispatch)(Card)
