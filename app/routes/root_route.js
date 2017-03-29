module.exports = function(express, app) {
  	app.use( express.static( __dirname + '/client/frontpage' ));
	app.get('/', function(req, res) {
		res.sendFile( path.join( __dirname, 'client/frontpage', 'index.html' ));
	});
};