import React, {Component} from 'react'
import {connect} from 'react-redux'
import FlipMove from 'react-flip-move'
import axios from 'axios'

import Card from './Card'
import store, {addVideoLinkDispatch, setCurrentVideo} from '../store'
import VideoPlayer from './VideoPlayer'

const AUDIO = document.createElement('audio');
const con = console.log;

class Queue extends Component {

  constructor(props){
    super(props);
    this.state = {
      prev: null,
      isPlaying: true,
      toggle: '❚❚'
    }
    this.toggle = this.toggle.bind(this);
  }

  componentDidUpdate(){
    if (this.state.prev !== this.props.current.id){
      this.setState({
        prev: this.props.current.id,
        isPlaying: true,
        toggle: '❚❚'
      })
      //this.props.load(this.props.current)
    }
  }

  toggle(){
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  pause(){
    AUDIO.pause()
    this.setState({ isPlaying: false, toggle: '►' });
  }

  play(){
    AUDIO.play()
    this.setState({ isPlaying: true, toggle: '❚❚' });
  }

  render(){
    const { songs, current, playlist, addLinkToQ, videos } = this.props;

    function idExists(el, arr){
      for (var i = 0; i < arr.length; i++){
        if (arr[i].id === el.id){
          return true
        }
      }
      return false;
    }

    const userSongs = songs.filter(song => idExists(song, playlist))

    return (
      <div>

        <form onSubmit={(event) => addLinkToQ(event)} className="row">
          <input name="addlinktoqueue" className="ten columns" placeholder="Paste link here..."  />
          <button type="submit" >Add</button>
        </form>

        <div>
          <VideoPlayer />
        </div>


        <FlipMove duration={750}>
        {
          videos.map((video, idx) => (
            <Card key={idx} video={video} type={true} />
          ))
        }
        </FlipMove>
      </div>
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
    load(current){
      AUDIO.src = current.audioUrl
      AUDIO.load()
      AUDIO.play()
      .catch(error => console.error(error))
    },
    addLinkToQ(event){
      event.preventDefault();
      if( event.target.addlinktoqueue.value )
      {
        let url = event.target.addlinktoqueue.value;
        if( store.getState().videos.length === 0 && store.getState().current === '' )
          dispatch(setCurrentVideo(url.substring(url.indexOf('?v=')+3))) ////////need to change this videoId parsing
        else
          dispatch(addVideoLinkDispatch(event.target.addlinktoqueue.value))
        event.target.addlinktoqueue.value = "";
      }

    }
  }
}

export default connect(mapState, mapDispatch)(Queue)
