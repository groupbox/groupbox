import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from './Card'
import store, {fetchSearchResults} from '../store'

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

    handleChange(event) {
      if( event.target.value.toLowerCase() )
        this.props.loadSearchResult(event.target.value.toLowerCase());
    }

  render() {
    let songs = Object.keys(this.state).length == 0 ? [] : this.state.search.tracks.items;
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

const mapDispatch = (dispatch) => {
  return {
    loadSearchResult(searchWords){
      dispatch(fetchSearchResults(store.getState().user.accessToken, searchWords));
    }
  }
}

export default connect(mapState, mapDispatch)(Search)
