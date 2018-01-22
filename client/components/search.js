import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from './Card'

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: ''
    }
      this.handleChange = this.handleChange.bind(this)
  }

    handleChange(event) {
      this.setState({
        input: event.target.value.toLowerCase()
      })
    }

render() {
  const songs = this.state.input ? this.props.songs.filter(song => song.name.toLowerCase().match(this.state.input) ||  song.artists[0].name.toLowerCase().match(this.state.input)) : null;

  return (
    <div>
        <div>
          <div className="row">
            <input className="twelve columns" placeholder="Search music..." onChange={this.handleChange} />
          </div>
          <div>
          {
            songs && songs.length ?
            songs.map(song => (
            <Card key={song.id} song={song} type={false} />
            )) : null
          }
        </div>
        </div>
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
  return {}
}

export default connect(mapState, mapDispatch)(Search)
