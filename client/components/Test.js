import React, {Component} from 'react';
import {vote, addToPlaylist} from '../store'
import axios from 'axios'
import YouTube from 'react-youtube'
//var fetchVideoInfo = require('youtube-info');
const con = console.log;

/*
curl -X GET "https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj" 
-H "Accept: application/json" 
-H "Authorization: Bearer BQBN92zoVn2ApHc8reFnkUAKV36-eKB6j5RZ16hPVUkgMlHXm3u1UaDMO87vWSLAYXZV_8idvAJijNEvVMH6LyfrCfTNK4ZYua1j9Kw4Zl_R6WFIkEHiPEjbjlQAKAFHGVQlDhY5hmxT61l5KHb3hDdwkPnR-3VXmQ"
*/

export default class Test extends Component {
  constructor(props){
    super(props);
    this.state = {
        list: ['3-Sbt345jkk','wzY7S_RGHm4','jLO1CPYv0hc','hpigjnKl7nI','isSxB7pleEQ','FscMzbEOlXk','Fc1P-AEaEp8','8kNVqUKK4UM']
    }
    //this.spotifyTest = this.spotifyTest.bind(this);
    this.videoId = '2g811Eo7K8U';
    this.playNext = this.playNext.bind(this);
  }

//   spotifyTest(){
//       //sherdog
//     let token = "BQBd_O1rYYzcRLKEi1fAXxqn_wEPwEcHzO2sMFPHkfV64pvhxlEdmaGeOtHMgQMYlos_XAG0jvAOX2gg3iZjUQ4oca-Yfpw-X5LMr3rA-dOCCTVRujO3-LnCwbL2Xa1DbdAJJswdw9wEctU7Su7btTmI9F7Zk2Dx26QyZD4"
//     //axios.get('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj', { headers: {'Authorization': "Bearer " + token} } )
//     axios.get('https://api.spotify.com/v1/search?q=exodus&type=track,artist', { headers: {'Authorization': "Bearer " + token} } )
//     .then(response => con('qqqqqqqqqqqqqqqqq', response.data))
//     .catch(err => con('Test errooooorrrrrrrr', err))
//   }

  componentDidMount(){
    // var tag = document.createElement('script');
    // tag.src = "https://www.youtube.com/iframe_api";
    // var firstScriptTag = document.getElementsByTagName('script')[0];
    // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

    //var player;
    // onYouTubeIframeAPIReady() {
    // var player = new YT.Player('player', {
    //     height: '390',
    //     width: '640',
    //     videoId: 'M7lc1UVf-VE',
    //     events: {
    //     'onReady': onPlayerReady,
    //     'onStateChange': onPlayerStateChange
    //     }
    // });
    // }

    playNext(){
        this.videoId = this.state.list.shift();
        con('aaaaaaaaaaaaaaaa', this.videoId)
        this.setState({list: this.state.list});

    }

    render(){
        con('renderinnnnnnnnnnng')
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1
            }
          };

        return (
            <YouTube
                videoId={this.videoId}
                opts={opts}
                onEnd={this.playNext}
            />
        )
    }
}

/*
3-Sbt345jkk
wzY7S_RGHm4
jLO1CPYv0hc
hpigjnKl7nI
isSxB7pleEQ
FscMzbEOlXk
Fc1P-AEaEp8
8kNVqUKK4UM
*/

