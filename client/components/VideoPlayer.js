import React, {Component} from 'react';
import {removeFirstVideo, setCurrentVideo, updateVideo, updateVote} from '../store'
import {connect} from 'react-redux'
import YouTube from 'react-youtube'
import socket from '../socket'


class VideoPlayer extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.playNext = this.playNext.bind(this)
    this.handleSkip = this.handleSkip.bind(this)
  }

    playNext(){
        if (this.props.videos.length > 0) {
            this.props.setNextVideo(this.props.current, this.props.videos[0]);
        } else {
          this.props.setNextVideo(this.props.current, {videoId: ''})
        }
    }

    handleSkip(video, userId){
      this.props.emitSkip()
      this.props.handleVote(video, userId)
    }

    render(){
        const {current, user, userVotes, videos} = this.props

        let videoVote = {
          vote: null
        }

        if (userVotes.length){
           let tempVote = userVotes.filter(vote => vote.videoId === current.id)
           if (tempVote.length){
             videoVote = tempVote[0]
           }
        }
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 1,
                // controls: 0
              }
            };

        return (
          <div id="video-container">
            <YouTube
              videoId={current.videoId}
              opts={opts}
              onEnd={this.playNext} />
              <div id="skip-button-container">
                <button id="skip-button" onClick={() => this.handleSkip(current, user.id)} disabled={videoVote.vote === 'skip' || !videos.length}><i className="material-icons" id="skip-id">fast_forward</i>
                </button>
            </div>
          </div>
        )
    }
}

const mapState = (state) => {
    return {
        current: state.current,
        videos: state.videos,
        user: state.user,
        userVotes: state.userVotes,
        emitSkip: function(){
          if (state.current.videoId && state.videos.length){
            state.current.vote++
            socket.emit('skip-pressed', state.current, state.videos[0])
          }
        }
    }
  }

  const mapDispatch = (dispatch) => {
    return {
        setNextVideo(current, next){
          current.hasPlayed = true
          current.isCurrent = false
          dispatch(updateVideo(current))
          dispatch(setCurrentVideo(next))
          dispatch(removeFirstVideo())
      },
        handleVote(video, userId) {
          video.vote++
          dispatch(updateVote(userId, video.id, 'skip'))
          dispatch(updateVideo(video))
      }
    }
  }

export default connect(mapState, mapDispatch)(VideoPlayer)
