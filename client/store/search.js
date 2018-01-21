const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi();

spotifyApi.setCredentials({
  clientId: '5f644508f98a4d1cbed444d645af0f52',
  clientSecret: '7458be4378ce44a9a9b54b162d6c4d82',
  redirectUri: 'http://localhost:8888/auth/spotify/callback',
  refreshToken: 'BQC3MLqliuAVrb_BBe_9xAiNfrqVpygh2AvQZtKZaOsBkjZ1H97isW5x_aSVccoev9Iby2v-SMqegOaG-B9p0Qono2KQtsf6B8mCg7o9W5Q4krIGfjuEjCjQeJLdpFwRtseW_V7w13ygY0pB72QShKZa',
  accessToken: 'AQAoKqLuzBASK1mTrDB6_75wbS0mVejduvWHOKrMqlu9X09i2oqmmZKuXVQL9jt8T1I1SifUfbUUuUw0S5Za5f-fm8heVQ1ddFVDIxHcjiUtOLPm7D3vFUZoRCq1BPvp55c',
});


export function search(){
  return spotifyApi.searchArtists('Metallica')
  .then(function(data) {
    console.log(data.body);
  }, function(err) {
    console.error(err);
  });
}

// import {Client, ArtistHandler} from 'spotify-sdk';
//
// let client = Client.instance;
//
// client.settings = {
//     clientId: '5f644508f98a4d1cbed444d645af0f52',
//     secretId: '7458be4378ce44a9a9b54b162d6c4d82'
// };
//
// var artist = new ArtistHandler();
//
// /*
//  * #4 example
//  * Get artist with the name 'Muse', should return a Collection of artists.
//  */
// export function search(){
// return artist.search('Muse').then((artistCollection) => {
//     console.log(artistCollection);
//   });
// }
