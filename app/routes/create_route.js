var cookieParser = require('cookie-parser');
var recents_builder = require('../model/recents_builder');

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyCredentials = require('./../credentials/spotify_credentials');
var spotifyApi = new SpotifyWebApi(spotifyCredentials);

module.exports = function(express, app) {
	app.use(cookieParser());

	app.get('/create', function(req, res) {
		 var userDetails = JSON.parse(req.cookies.userDetails);
		 if(userDetails === undefined) {
		 	console.log("Error: No cookie");
		 }
		 else {
		 	//Prepare Spotify API
		 	var userId = userDetails.userId;
		 	spotifyApi.setAccessToken(userDetails.access_token);
 			spotifyApi.setRefreshToken(userDetails.refresh_token);

 			recents_builder(userId, spotifyApi);

 			// spotifyApi.getMe()
		 	// .then(function(data) {
		 	// 	res.send(data);
		 	// }, function(err) {
		 	// 	console.log('Something went wrong!', err);
		 	// });

 			res.send("You should have a new playlist");
		 }
	});
};