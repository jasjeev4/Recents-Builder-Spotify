var path = require('path');
var cookieParser = require('cookie-parser');

module.exports = function(express, app) {
	app.use(cookieParser());

	app.get('/', function(req, res) {
		if(req.cookies.userDetails === undefined) {
			app.use( express.static( __dirname + '/../pages/frontpage' ));
			res.sendFile( path.join( __dirname, '/../pages/frontpage', 'index.html' ));
		}
		else {
			res.redirect('/create');
		}
	});
};