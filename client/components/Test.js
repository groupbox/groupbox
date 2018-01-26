import React, {Component} from 'react';
import {vote, addToPlaylist} from '../store'
import axios from 'axios'

const con = console.log;

/*
curl -X GET "https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj" 
-H "Accept: application/json" 
-H "Authorization: Bearer BQBN92zoVn2ApHc8reFnkUAKV36-eKB6j5RZ16hPVUkgMlHXm3u1UaDMO87vWSLAYXZV_8idvAJijNEvVMH6LyfrCfTNK4ZYua1j9Kw4Zl_R6WFIkEHiPEjbjlQAKAFHGVQlDhY5hmxT61l5KHb3hDdwkPnR-3VXmQ"
*/

export default class Test extends Component {
  constructor(props){
    super(props);
    this.state = {}
    this.spotifyTest = this.spotifyTest.bind(this);
  }

  spotifyTest(){
      //sherdog
    let token = "BQBd_O1rYYzcRLKEi1fAXxqn_wEPwEcHzO2sMFPHkfV64pvhxlEdmaGeOtHMgQMYlos_XAG0jvAOX2gg3iZjUQ4oca-Yfpw-X5LMr3rA-dOCCTVRujO3-LnCwbL2Xa1DbdAJJswdw9wEctU7Su7btTmI9F7Zk2Dx26QyZD4"
    //axios.get('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj', { headers: {'Authorization': "Bearer " + token} } )
    axios.get('https://api.spotify.com/v1/search?q=exodus&type=track,artist', { headers: {'Authorization': "Bearer " + token} } )
    .then(response => con('qqqqqqqqqqqqqqqqq', response.data))
    .catch(err => con('Test errooooorrrrrrrr', err))
  }

  componentDidMount(){
    // axios.get('/test')
    // .then(response => {con('wwwwwwwwwwwwwwwww', response)})
    this.spotifyTest();
  }

 render(){
    return (
        <div>
        </div>




    )
  }
}


