var express = require('express');
var http = require('http');
var app;
var router;
var server;
var requestBody;
var queryParameters;
var bodyParser = require('body-parser')

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
    router[options.verb.toLowerCase()](options.route, function (req, res) {
      handleRequest(req, res, options);
    });
  } else {
    router.get(options.route, function (req, res) {
      handleRequest(req, res, options);
    });
  }
}

function getRequestBody() {
  return requestBody;
}

function getQueryParameters(route) {
  return queryParameters;
}

function handleRequest(req, res, options) {
  requestBody = req.body;
  queryParameters = req.query;

  if (options.callback) {
    options.callback();
  }

  respond(res, options);
}

function respond(res, options) {
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
