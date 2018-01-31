import axios from 'axios'
import {setCurrentSong} from './current'

const GET_SONGS = 'GET_SONGS'
const UPDATE_SONG = 'UPDATE_SONG'

const getSongs = songs => ({type: GET_SONGS, songs})
const updateSong = song => ({type: UPDATE_SONG, song})

const initialSongs = []

export const fetchSongs = () =>
  dispatch =>
    axios.get('/api/songs')
      .then(res => {
        let songs = res.data.sort(function(songA, songB){return songB.vote - songA.vote})
        let current = songs.shift()
        dispatch(getSongs(songs || initialSongs))
        dispatch(setCurrentSong(current))
      })
      .catch(err => console.error(err))

export const vote = (song) =>
  dispatch =>
    axios.put('/api/songs/', song)
      .then(res => dispatch(updateSong(res.data)))
      .then(() => dispatch(fetchSongs()))
      .catch(err => console.error(err))

export default function (state = initialSongs, action) {
  switch (action.type) {
    case GET_SONGS:
      return action.songs
    default:
      return state
  }
}
