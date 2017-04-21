const rootRoute = require('./root_route');
const callbackRoute = require('./callback_route');
const createRoute = require('./create_route');

module.exports = function(express, app) {
  rootRoute(express, app);
  callbackRoute(express, app);
  createRoute(express, app);
  // Other route groups could go here, in the future
};