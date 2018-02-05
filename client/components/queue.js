import React, {Component} from 'react'
import {connect} from 'react-redux'
import FlipMove from 'react-flip-move'

import Card from './Card'
import {addNewVideo} from '../store'
import VideoPlayer from './VideoPlayer'

class Queue extends Component {

  constructor(props){
    super(props);
    this.state = {
      input: ''
    }
  }

  render(){
    const { addLinkToQueue, videos, currentRoom, current } = this.props;

    return (
      <div className="container">
        <div className="container" id="videoplayer">
          <VideoPlayer />
        </div>

        <form onSubmit={(event) => addLinkToQueue(event, currentRoom, current)} className="row" id="searchbar">
          <input id="videosearchinput" name="input" className="ten columns" placeholder="Paste link here..."  />
          <button id="add-video-button" type="submit">Add</button>
        </form>
        <div>
        <FlipMove duration={750}>
        {
          videos.length ? videos.map((video) => (
            <Card key={video.id } video={video} type={true} />
          )) : null
        }
        </FlipMove>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    email: state.user.email,
    videos: state.videos,
    currentRoom: state.currentRoom,
    current: state.current
  }
}

const mapDispatch = (dispatch) => {
  return {
    addLinkToQueue(event, currentRoom, current){
      event.preventDefault();
      dispatch(addNewVideo(event.target.input.value, currentRoom.id, current))
      event.target.input.value = '';
      }
  }
}

export default connect(mapState, mapDispatch)(Queue)
