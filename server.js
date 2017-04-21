const express = require('express');

const app = express();

const port = 8080;

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyCredentials = require('./app/credentials/spotify_credentials');
var spotifyApi = new SpotifyWebApi(spotifyCredentials);

require('./app/routes')(express, app, spotifyApi);

app.listen(port, function() {
console.log('Live on ' + port);
});            