import React, {Component} from 'react';
import {connect} from 'react-redux'
import {updateVideo} from '../store'

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    const {video, type, vote} = this.props

    return (
      <div className="card container">
        <div className="row" id="cardid">
          <div className="card-image three columns">
            <img src={video.thumbnail || null} />
          </div>
          <div className="card-artist five columns">
            <div>{video.title || null}</div>
            <div className="card-artist-name">
              <div>{video.author || null}</div>
            </div>
          </div>
          <div className="card-vote one columns">
            <div className="card-vote-amt">Vote: {video.vote}</div>
          </div>
          {
            type ? (
              <div id="up-down-container" className="card-control three columns">
                <div id="upvote-button">
                  <button className="card-control-button" onClick={() => vote(video, 1)}>↑</button>
                </div>
                <div id="downvote-button">
                  <button className="card-control-button" onClick={() => vote(video, -1)}>↓</button>
                </div>
              </div>
            ) : (
              <div className="card-control three columns">
                <div>
                  <button className="card-control-button-add">+</button>
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
    current: state.current
  }
}

const mapDispatch = (dispatch) => {
  return {
    vote(video, direction) {
      video.vote += direction
      dispatch(updateVideo(video))
    }
  }
}

export default connect(mapState, mapDispatch)(Card)
