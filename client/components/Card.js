import React, {Component} from 'react';
import {connect} from 'react-redux'
import {updateVote} from '../store'

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    const {video, type, vote} = this.props

    return (
      <div className="card container" >
        <div className="row">
          <div className="card-image three columns">
            <img src={video.thumbnail || null} />
          </div>
          <div className="card-artist five columns">
            <div className="card-artist-song">{video.title || null}</div>
            <div className="card-artist-name">
              <div>{video.author || null}</div>
            </div>
          </div>
          <div className="card-vote one columns">
            <div className="card-vote-amt">{video.vote}</div>
          </div>
          {
            type ? (
              <div className="card-control three columns">
                <div>
                  <button className="card-control-button" onClick={() => vote(video, 1)}>↑</button>
                </div>
                <div>
                  <button className="card-control-button" onClick={() => vote(video, -1)}>↓</button>
                </div>
              </div>
            ) : (
              <div className="card-control three columns">
                <div>
                  <button className="card-control-button-add">+</button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    email: state.user.email,
    current: state.current
  }
}

const mapDispatch = (dispatch) => {
  return {
    vote(video, direction) {
      console.log('updateVote!!!!!!!!!!')
      dispatch(updateVote(video, direction))
    }
  }
}

export default connect(mapState, mapDispatch)(Card)
