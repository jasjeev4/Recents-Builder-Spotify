const rootRoute = require('./root_route');
const callbackRoute = require('./callback_route');
const createRoute = require('./create_route');

module.exports = function(express, app, spotifyApi) {
  rootRoute(express, app);
  callbackRoute(express, app, spotifyApi);
  createRoute(express, app, spotifyApi);
  // Other route groups could go here, in the future
};