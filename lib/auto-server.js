var express = require('express');
var http = require('http');
var app;
var router;
var server;

function start(options, done) {
  app = express();
  app.use(router);
  server = app.listen(options.port , function() {
    done();
  });
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
  if(options.verb && options.verb == 'POST'){
    router.post(options.route, function(req, res) {
      if (options.statusCode) {
        res.sendStatus(options.statusCode);
      } else {
        res.sendStatus(200);
      }
    });
  }else{
    router.get(options.route, function(req, res) {
      if (options.statusCode) {
        res.sendStatus(options.statusCode);
      } else {
        res.sendStatus(200);
      }
    });
  }
}

module.exports.start = start;
module.exports.close = close;
module.exports.defineRoute = defineRoute;
