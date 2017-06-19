var express = require('express');
var http = require('http');
var app;
var router;
var server;
var requestBody;
var queryParameters;
var bodyParser = require('body-parser')

var handlers ={
  'GET': getHandler,
  'POST': postHandler,
  'PUT': putHandler,
  'DELETE': deleteHandler,
  'PATCH': patchHandler
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

function getHandler(router, options){
  router.get(options.route, function(req, res) {
    handleRequest(req, res, options);
  });
}

function postHandler(router, options){
  router.post(options.route, function(req, res) {
    handleRequest(req, res, options);
  });
}

function putHandler(router, options){
  router.put(options.route, function(req, res) {
    handleRequest(req, res, options);
  });
}

function deleteHandler(router, options){
  router.delete(options.route, function(req, res) {
    handleRequest(req, res, options);
  });
}

function patchHandler(router, options){
  router.patch(options.route, function(req, res) {
    handleRequest(req, res, options);
  });
}

function getRequestBody() {
  return requestBody;
}

function getQueryParameters(route) {
  return queryParameters;
}

function handleRequest(req, res, options){
  requestBody = req.body;
  queryParameters = req.query;
  
  if(options.callback){
    options.callback();
  }
  
  respond(res, options);
}

function respond(res, options){
  if (options.statusCode) {
    res.sendStatus(options.statusCode);
  } else {
    res.sendStatus(200);
  }
}

module.exports.start = start;
module.exports.close = close;
module.exports.defineRoute = defineRoute;
module.exports.getRequestBody = getRequestBody;
module.exports.getQueryParameters = getQueryParameters;
