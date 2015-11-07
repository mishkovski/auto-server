var express = require('express');
var http = require('http');
var app = express();
var router = express.Router();

function start(options, done) {

  router.use(function(req, res, next){
    console.log(JSON.stringify(req.body));
    next();
  });

  router.get('/', function(req, res){
    res.sendStatus(200);
  });

  app.use(router);
  server = app.listen(7777, function() {
    done();
  });
}

function define(options) {
  router.get(options.route, function(req, res){
    res.sendStatus(200);
  });
}

module.exports.start = start;
module.exports.define = define;
