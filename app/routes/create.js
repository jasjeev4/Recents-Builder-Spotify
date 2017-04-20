var cookieParser = require('cookie-parser');
var io = require('socket.io')(8088);

module.exports = function(express, app) {
	app.use(cookieParser());

	app.get('/create', function(req, res) {
		 
	});
};