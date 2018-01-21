const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy;
const { User } = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the routerropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 */

process.env.SPOTIFY_CLIENT_ID = '5f644508f98a4d1cbed444d645af0f52'
process.env.SPOTIFY_CLIENT_SECRET = '7458be4378ce44a9a9b54b162d6c4d82'
process.env.SPOTIFY_CALLBACK = 'http://localhost:8888/auth/spotify/callback'


if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {

  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.')

} else {

  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK
  }

  const strategy = new SpotifyStrategy(spotifyConfig, (accessToken, refreshToken, profile, done) => {
    const spotifyId = profile.id
    const name = profile.displayName
    const email = profile.emails[0].value

    User.find({where: {spotifyId}})
      .then(foundUser => (foundUser
        ? foundUser.update({accessToken, refreshToken}).then(() => done(null, foundUser))
        : User.create({name, email, spotifyId, accessToken, refreshToken})
          .then(createdUser => done(null, createdUser))
      ))
      .catch(done)
  })

  passport.use(strategy)


router.get('/', passport.authenticate('spotify', {scope: ['user-read-email'], showDialog: true}))

router.get('/callback', passport.authenticate('spotify', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))

}
