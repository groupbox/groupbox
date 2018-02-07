import React, {Component} from 'react';
import store, {removeFirstVideo, setCurrentVideo, updateVideo} from '../store'
import {connect} from 'react-redux'
import YouTube from 'react-youtube'
import socket from '../socket'


class VideoPlayer extends Component {
  constructor(props){
    super(props);
    this.state = store.getState();
    this.playNext = this.playNext.bind(this);
  }

    playNext(){
        if (this.props.videos.length > 0) {
            this.props.setNextVideo(this.props.current, this.props.videos[0]);
        }
    }

    render(){
        const {current, handleClick} = this.props
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
            <button onClick={handleClick}>Skip</button>
          </div>
        )
    }
}

const mapState = (state) => {
    return {
        current: state.current,
        videos: state.videos,
        handleClick: function(){
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
      }
    }
  }

export default connect(mapState, mapDispatch)(VideoPlayer)
