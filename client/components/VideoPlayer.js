import React, {Component} from 'react';
import {removeFirstVideo, setCurrentVideo, updateVideo, updateVote} from '../store'
import {connect} from 'react-redux'
import YouTube from 'react-youtube'
import socket from '../socket'


class VideoPlayer extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

    playNext(){
        if (this.props.videos.length > 0) {
            this.props.setNextVideo(this.props.current, this.props.videos[0]);
        }
    }

    handleSkip(video, userId){
      this.props.emitSkip()
      this.props.handleVote(video, userId)
    }

    render(){
        const {current, user, userVotes} = this.props

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
          <div>
            <YouTube
              videoId={current.videoId}
              opts={opts}
              onEnd={this.playNext} />
            <button onClick={() => this.handleSkip(current, user.id)} disabled={videoVote.vote === 'skip'}>Skip</button>
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
          state.current.vote++
          socket.emit('skip-pressed', state.current, state.videos[0])
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
