import React, {Component} from 'react';
import store, {vote, addToPlaylist} from '../store'
import {connect} from 'react-redux'
import YouTube from 'react-youtube'

const con = console.log;


class VideoPlayer extends Component {
  constructor(props){
    super(props);
    this.state = store.getState();
    this.videoId = '2g811Eo7K8U';
    this.playNext = this.playNext.bind(this);
  }

  componentDidMount(){
      //this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }


    playNext(){
        if(this.props.videos.length > 0)
        {
            this.videoId = this.props.videos[0].videoId;
            this.props.removeFirstVideo()
        }
        con('aaaaaaaaaaaaaaaa', this.videoId)
    }

    render(){
        const {videos} = this.props

        con('renderinnnnnnnnnnng', this.videoId)
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1
            }
          };

        return (

            <YouTube
                videoId={this.videoId}
                opts={opts}
                onEnd={this.playNext}
            />
        )
    }
}

const mapState = (state) => {
    return {
      email: state.user.email,
      songs: state.songs,
      current: state.current,
      playlist: state.playlist,
      videos: state.videos
    }
  }

  const mapDispatch = (dispatch) => {
    return {
        removeFirstVideo(){
          dispatch({type: 'REMOVE_FIRST_VIDEO'})
      }
    }
  }

export default connect(mapState, mapDispatch)(VideoPlayer)