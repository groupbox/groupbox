import axios from 'axios'

const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS'
//const token = "BQAWl5ToCCy6jcJ4PoGxo-YoiqrqlYbINq38U2awLPDa7PQU_AaALRW0BMYfppgDrwqWOrCtdvUq38zVcjv0L22yHVhW5-m3TG38zLZFdsClrfdTe6bqU3rzBA-51yrDWOIcmYY_LdPby_ie-CJypFxKKGudK2G6oCuTbPc"

//ACTIONS
export function updateSearchResultAction(results){
    return {
        type: GET_SEARCH_RESULTS, results
    }
}

//DISPATCHERS
export function fetchSearchResults(token, searchWords) {
    searchWords = searchWords.replace(" ", "%20");
    let urlStr = "https://api.spotify.com/v1/search?q=" + searchWords + "&type=track";
    return function thunk(dispatch) {
        return axios.get(urlStr, { headers: {'Authorization': "Bearer " + token} } )
            .then(response => {
                    dispatch(updateSearchResultAction(response.data)) 
                }
            )
            .catch(console.error);
    }
}

//REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return action.results
    default:
      return state
  }
}
