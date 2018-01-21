

const SET_CURRENT = 'SET_CURRENT'

export const setCurrent = song => ({type: SET_CURRENT, song})

export const setCurrentSong = (song) => {
  return function(dispatch){
    dispatch(setCurrent(song))
  }
}

export default function (state = {}, action){
  switch (action.type) {
    case SET_CURRENT:
      return action.song || state
    default:
      return state
  }
}
