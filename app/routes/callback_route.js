var cookieParser = require('cookie-parser');

module.exports = function(express, app, spotifyApi) {
	app.use(cookieParser());
	
	app.get('/callback/', function(req, res) {
		var code  = req.query.code; // Read the authorization code from the query parameters
		// Get the access token! 
		spotifyApi.authorizationCodeGrant(code)
		.then(function(data) {
			var access_token =  data.body['access_token'];
			var refresh_token = data.body['refresh_token'];
			var expires_in = data.body['expires_in']-60;

			spotifyApi.setAccessToken(access_token);
		 	spotifyApi.setRefreshToken(refresh_token);

		 	spotifyApi.getMe()
		 	.then(function(data) {
		 		var userId = data.body.id;
		 		var userDetails = {
		 			userId: userId,
		 			access_token: access_token,
		 			refresh_token: refresh_token
		 		}
		 		res.cookie('userDetails' , JSON.stringify(userDetails), {expire : new Date() + expires_in});//.send('Cookie is set');
		 		res.redirect('/create');
		  	});
		});
	});
};