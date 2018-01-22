import React, {Component} from 'react'
import {connect} from 'react-redux'
import FlipMove from 'react-flip-move'
import Card from './Card'

const AUDIO = document.createElement('audio');

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
      // this.props.load(this.props.current)
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
    const { songs, current } = this.props;

    return (
      <div>
        <div className="now-playing">
          <Card song={current} />
          <div className="toggle">
            <button onClick={this.toggle}>{this.state.toggle}</button>
          </div>
        </div>
        <FlipMove duration={750}>
        {
          songs.map(song => (
            <Card key={song.id} song={song} />
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
    current: state.current
  }
}

const mapDispatch = () => {
  return {
    load(current){
      AUDIO.src = current.audioUrl
      AUDIO.load()
      AUDIO.play()
      .catch(error => console.error(error))
    }

  }
}

export default connect(mapState, mapDispatch)(Queue)
