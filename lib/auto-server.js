var express = require('express');
var http = require('http');
var application = express();

function setup(options, done){
  done();
}

function start(options, done){
    var port = 7777;

    server = http.createServer(application);

    server.listen(port, function() {
        done();
    });
}

function addEndpoint(options, done){
  done();
}

module.exports.setup = setup;
module.exports.start = start;
module.exports.addEndpoint = addEndpoint;
