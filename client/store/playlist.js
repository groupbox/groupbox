
const ADD_SONG = 'ADD_SONG'

const initialSongs = []

const addSong = song => ({type: ADD_SONG, song})

export const addToPlaylist = (song) => {
  return function (dispatch){
    dispatch(addSong(song))
  }
}

export default function (state = initialSongs, action){
  switch (action.type) {
    case ADD_SONG:
      return state.concat([action.song])
    default:
      return state
  }
}
