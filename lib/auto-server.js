var express = require('express');
var http = require('http');
var application = express();

function setup(options, done) {
  done();
}

function start(options, done) {
  application.get('/', function(req, res) {
    res.sendStatus(200);
  });
  server = application.listen(7777, function() {
    done();
  });
}

function addEndpoint(options, done) {
  done();
}

module.exports.setup = setup;
module.exports.start = start;
module.exports.addEndpoint = addEndpoint;
