import React, {Component} from 'react';
import store, {removeFirstVideo, setCurrentVideo} from '../store'
import {connect} from 'react-redux'
import YouTube from 'react-youtube'


class VideoPlayer extends Component {
  constructor(props){
    super(props);
    this.state = store.getState();
    this.playNext = this.playNext.bind(this);
  }

    playNext(){
        if (this.props.videos.length > 0)
        {
            this.props.removeFirstVideo(this.props.videos[0].videoId);
        }
    }

    render(){
        const {current} = this.props
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 1
            }
          };

        return (

            <YouTube
                videoId={current}
                opts={opts}
                onEnd={this.playNext}
            />
        )
    }
}

const mapState = (state) => {
    return {
        current: state.current,
        videos: state.videos
    }
  }

  const mapDispatch = (dispatch) => {
    return {
        removeFirstVideo(videoId){
          dispatch(setCurrentVideo(videoId))
          dispatch(removeFirstVideo())
      }
    }
  }

export default connect(mapState, mapDispatch)(VideoPlayer)
