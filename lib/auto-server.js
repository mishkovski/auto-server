var express = require('express');
var http = require('http');
var app;
var router;
var server;
var routeData = {};
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
  if (options.verb && options.verb == 'POST') {
    router.post(options.route, function(req, res) {

      routeData[options.route] = req.body;
      if (options.statusCode) {
        res.sendStatus(options.statusCode);
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    router.get(options.route, function(req, res) {
      if (options.statusCode) {
        res.sendStatus(options.statusCode);
      } else {
        res.sendStatus(200);
      }
    });
  }
}

function received(route) {
  return routeData[route];
}

module.exports.start = start;
module.exports.close = close;
module.exports.defineRoute = defineRoute;
module.exports.received = received;
