var autoServer = require('../lib/auto-server');
var expect = require('chai').expect;
var http = require('http');

describe('auto-server', function() {
  var requestOptions = {
    host: 'localhost',
    port: 7777,
    path: '/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  it('exists', function() {
    expect(autoServer).to.not.equal(undefined);
  });

  it('exports module functions', function() {
    expect(autoServer.setup).to.not.equal(undefined);
    expect(autoServer.start).to.not.equal(undefined);
  });

  it('on start listens', function(done) {
    autoServer.start({}, function() {
      var req = http.request(requestOptions, function(response) {
        expect(response.statusCode).to.equal(200);
        done();
      }).end();

    });
  });

  it('defines a route', function(){
    var testRoute = '/routeOne';

    autoServer.define(testRoute, function(){
      autoServer.start({}, function() {
        requestOptions.path = testRoute;
        var req = http.request(requestOptions, function(response) {
          expect(response.statusCode).to.equal(200);
          done();
        }).end();
      });
    });
  });
});
