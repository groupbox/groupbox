import React, {Component} from 'react';
import {connect} from 'react-redux'
import {updateVideo, updateVote} from '../store'

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    const {video, user, handleVote, userVotes } = this.props

    let videoVote = {
      vote: null
    }
    if (userVotes.length){
       let tempVote = userVotes.filter(vote => vote.videoId === video.id)
       if (tempVote.length){
         videoVote = tempVote[0]
       }
    }

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
            <div id="up-down-container" className="card-control three columns">
              <div id="upvote-button">
                <button className="card-control-button" disabled={videoVote.vote === 'up'} onClick={() => handleVote(video, 1, user.id)}>↑</button>
              </div>
              <div id="downvote-button">
                <button className="card-control-button" disabled={videoVote.vote === 'down'} onClick={() => handleVote(video, -1, user.id)}>↓</button>
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
    current: state.current,
    user: state.user,
    userVotes: state.userVotes
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleVote(video, direction, userId) {
      video.vote += direction
      let vote = direction > 0 ? 'up' : 'down'
      dispatch(updateVideo(video))
      dispatch(updateVote(userId, video.id, vote))
    }
  }
}

export default connect(mapState, mapDispatch)(Card)
