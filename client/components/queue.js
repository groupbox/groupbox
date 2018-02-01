import React, {Component} from 'react'
import {connect} from 'react-redux'
import FlipMove from 'react-flip-move'

import Card from './Card'
import {addNewVideo, fetchVideos} from '../store'
import VideoPlayer from './VideoPlayer'

class Queue extends Component {

  constructor(props){
    super(props);
    this.state = {
      input: ''
    }
  }

  render(){
    const { addLinkToQueue, videos, currentRoom } = this.props;

    return (
      <div>

        <form onSubmit={(event) => addLinkToQueue(event, currentRoom, videos)} className="row">
          <input name="input" className="ten columns" placeholder="Paste link here..."  />
          <button type="submit">Add</button>
        </form>

        <div>
          <VideoPlayer />
        </div>
        <FlipMove duration={750}>
        {
          videos.length ? videos.map((video) => (
            <Card key={video.id } video={video} type={true} />
          )) : null
        }
        </FlipMove>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    email: state.user.email,
    videos: state.videos,
    currentRoom: state.currentRoom
  }
}

const mapDispatch = (dispatch) => {
  return {
    addLinkToQueue(event, currentRoom, videos){
      event.preventDefault();
      let first = videos.length
      dispatch(addNewVideo(event.target.input.value, currentRoom.id, first))
      event.target.input.value = '';
      }
  }
}

export default connect(mapState, mapDispatch)(Queue)
