var autoServer = require('../lib/auto-server');
var expect = require('chai').expect;
var http = require('http');
var request = require('request');
var testPort = 7777;

describe('auto-server', function() {
  afterEach(function(done) {
    autoServer.close(done);
  });

  it('exists', function(done) {
    expect(autoServer).to.not.equal(undefined);
    done();
  });

  it('exports module functions', function(done) {
    expect(autoServer.start).to.not.equal(undefined);
    expect(autoServer.defineRoute).to.not.equal(undefined);
    expect(autoServer.close).to.not.equal(undefined);
    done();
  });

  it('defineRoute by default defines GET route', function(done) {
    autoServer.defineRoute({
      route: '/routeGet'
    });
    autoServer.start({port: testPort}, function() {
      var requestOptions = {
        port: testPort,
        uri: 'http://localhost:7777/routeGet'
      };
      request(requestOptions, function(err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('defineRoute can define POST route', function(done) {
    autoServer.defineRoute({
      route: '/routePost',
      verb: 'POST'
    });
    autoServer.start({port: testPort}, function() {
      var requestOptions = {
        port: testPort,
        uri: 'http://localhost:7777/routePost',
        method: 'POST'
      };
      request(requestOptions, function(err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('defineRoute can define a route that responds with a status code', function(done) {
    var expectedStatusCode = 202;
    autoServer.defineRoute({
      route: '/routeWithStatus',
      statusCode: expectedStatusCode
    });
    autoServer.start({port: testPort}, function() {
      var requestOptions = {
        port: testPort,
        uri: 'http://localhost:7777/routeWithStatus'
      };
      request(requestOptions, function(err, res, body) {
        expect(res.statusCode).to.equal(expectedStatusCode);
        done();
      });
    });
  });
});
