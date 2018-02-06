import axios from 'axios'

const UPDATE_VOTE = 'UPDATE_VOTE'
const GET_VOTES = 'GET_VOTES'

export const updateVoteAction = function(vote){
  return {
    type: UPDATE_VOTE,
    vote
  }
}

export const getVotes = function(votes){
  return {
    type: GET_VOTES,
    votes
  }
}

export function updateVote(userId, videoId, vote){
  return function(dispatch){
    let voteObj = {userId, videoId, vote}
    axios.put('/api/vote', voteObj)
    .then(() => dispatch(fetchVotes(userId)))
    .catch(err => console.log(err))
  }
}

export function fetchVotes(userId){
  return function(dispatch){
    axios.get(`/api/vote/${userId}`)
    .then(res => res.data)
    .then(votes => dispatch(getVotes(votes)))
    .catch(err => console.log(err))
  }
}

export default function videosReducer(state = [], action){
  switch (action.type){
    case GET_VOTES:
      return action.votes
    default:
      return state;
  }
}
