var express = require('express');
var http = require('http');
var app = express();
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

function define(options) {
  router = express.Router();
  router.get(options.route, function(req, res) {
    if (options.statusCode) {
      res.sendStatus(options.statusCode);
    } else {
      res.sendStatus(200);
    }
  });
}

module.exports.start = start;
module.exports.close = close;
module.exports.define = define;
