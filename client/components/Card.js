import React, {Component} from 'react';
import {connect} from 'react-redux'
import {vote, addToPlaylist, modifyVideoVoteDispatcher} from '../store'

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    const {video, upvoteSong, downvoteSong, type, addSong} = this.props

    return (
      <div className="card container" >
        <div className="row">
          <div className="card-image three columns">
            <img src={video.thumbnail || null} />
          </div>
          <div className="card-artist five columns">
            <div className="card-artist-song">{video.title || null}</div>
            <div className="card-artist-name">
              <div>{video.author || null}</div>
            </div>
          </div>
          <div className="card-vote one columns">
            <div className="card-vote-amt">{video.vote}</div>
          </div>
          {
            type ? (
              <div className="card-control three columns">
                <div>
                  <button className="card-control-button" onClick={() => upvoteSong(video.videoId)}>↑</button>
                </div>
                <div>
                  <button className="card-control-button" onClick={() => downvoteSong(video.videoId)}>↓</button>
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
    upvoteSong (videoId) {
      dispatch(  modifyVideoVoteDispatcher(videoId, 1)  )
    },
    downvoteSong (videoId) {
      dispatch(  modifyVideoVoteDispatcher(videoId, -1)  )
    },
    addSong(song, evt) {
      evt.target.innerHTML =  '✔'
      dispatch(addToPlaylist(song))
    }
  }
}

export default connect(mapState, mapDispatch)(Card)
