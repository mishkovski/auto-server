var autoServer = require('../lib/auto-server');
var expect = require('chai').expect;
var http = require('http');
var request = require('request');
var testPort = 7777;

describe('auto-server', function() {
  afterEach(function(done) {
    autoServer.close(done);
  });

  var requestOptions = {
    port: testPort,
    uri: 'http://localhost:7777'
  };

  var testRoute = '/routeOne';

  it('exists', function(done) {
    expect(autoServer).to.not.equal(undefined);
    done();
  });

  it('exports module functions', function(done) {
    expect(autoServer.start).to.not.equal(undefined);
    expect(autoServer.define).to.not.equal(undefined);
    expect(autoServer.close).to.not.equal(undefined);
    done();
  });

  it('defines a route', function(done) {
    autoServer.define({
      route: testRoute
    });
    autoServer.start({port: testPort}, function() {
      requestOptions.uri += testRoute;
      request(requestOptions, function(err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('responds with the specified status code', function(done) {
    var expectedStatusCode = 404;
    autoServer.define({
      route: testRoute,
      statusCode: expectedStatusCode
    });
    autoServer.start({port: testPort}, function() {
      requestOptions.path = testRoute;
      request(requestOptions, function(err, res, body) {
        expect(res.statusCode).to.equal(expectedStatusCode);
        done();
      });
    });
  });
});
