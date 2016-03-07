var express = require('express');
var http = require('http');
var app;
var router;
var server;
var routeData = {};
var bodyParser = require('body-parser')

var handlers ={
  'GET': getHandler,
  'POST': postHandler,
  'PUT': putHandler
};

function start(options, done) {
  app = express();
  app.use(bodyParser.json());
  app.use(router);

  server = app.listen(options.port, done);
}

function close(done) {
  if (server) {
    server.close(done);
  } else {
    done();
  }
}

function defineRoute(options) {
  router = express.Router();
  if (options.verb) {
    handlers[options.verb](router, options);
  } else {
    handlers['GET'](router, options);
  }
}

function respond(res, options){
  if (options.statusCode) {
    res.sendStatus(options.statusCode);
  } else {
    res.sendStatus(200);
  }
}

function getHandler(router, options){
  router.get(options.route, function(req, res) {
    respond(res, options);
  });
}

function postHandler(router, options){
  router.post(options.route, function(req, res) {
    routeData[options.route] = req.body;
    respond(res, options);
  });
}

function putHandler(router, options){
  router.put(options.route, function(req, res) {
    routeData[options.route] = req.body;
    respond(res, options);
  });
}

function received(route) {
  return routeData[route];
}

module.exports.start = start;
module.exports.close = close;
module.exports.defineRoute = defineRoute;
module.exports.received = received;
