var cookieParser = require('cookie-parser');

module.exports = function(express, app, spotifyApi) {
	app.use(cookieParser());

	app.get('/create', function(req, res) {
		 
	});
};