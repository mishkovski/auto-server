var autoServer = require('../lib/auto-server');
var expect = require('chai').expect;
var http = require('http');
var request = require('request');
var testPort = 7777;

describe('auto-server', function () {
  afterEach(function (done) {
    autoServer.close(done);
  });

  it('exists', function (done) {
    expect(autoServer).to.not.equal(undefined);
    done();
  });

  it('exports module functions', function (done) {
    expect(autoServer.start).to.not.equal(undefined);
    expect(autoServer.close).to.not.equal(undefined);
    expect(autoServer.defineRoute).to.not.equal(undefined);
    expect(autoServer.getRequestBody).to.not.equal(undefined);
    expect(autoServer.getQueryParameters).to.not.equal(undefined);
    done();
  });

  it('defineRoute by default defines a GET route', function (done) {
    autoServer.defineRoute({
      route: '/routeGet'
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/routeGet'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('defineRoute can define a GET route', function (done) {
    autoServer.defineRoute({
      route: '/routePost',
      verb: 'GET'
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/routePost',
        method: 'GET'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('defineRoute can define a POST route', function (done) {
    autoServer.defineRoute({
      route: '/routePost',
      verb: 'POST'
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/routePost',
        method: 'POST'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('defineRoute can define a PUT route', function (done) {
    autoServer.defineRoute({
      route: '/routePut',
      verb: 'PUT'
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/routePut',
        method: 'PUT'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('defineRoute can define a DELETE route', function (done) {
    autoServer.defineRoute({
      route: '/routeDelete',
      verb: 'DELETE'
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/routeDelete',
        method: 'DELETE'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('defineRoute can define a PATCH route', function (done) {
    autoServer.defineRoute({
      route: '/routePatch',
      verb: 'PATCH'
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/routePatch',
        method: 'PATCH'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('defineRoute can define a GET route that responds with a desired status code', function (done) {
    var expectedStatusCode = 202;
    autoServer.defineRoute({
      route: '/routeWithStatus',
      verb: 'GET',
      statusCode: expectedStatusCode
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/routeWithStatus',
        method: 'GET'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(expectedStatusCode);
        done();
      });
    });
  });

  it('defineRoute can define a POST route that responds with a desired status code', function (done) {
    var expectedStatusCode = 202;
    autoServer.defineRoute({
      route: '/routeWithStatus',
      verb: 'POST',
      statusCode: expectedStatusCode
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/routeWithStatus',
        method: 'POST'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(expectedStatusCode);
        done();
      });
    });
  });

  it('defineRoute can define a PUT route that responds with a desired status code', function (done) {
    var expectedStatusCode = 202;
    autoServer.defineRoute({
      route: '/routeWithStatus',
      verb: 'PUT',
      statusCode: expectedStatusCode
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/routeWithStatus',
        method: 'PUT'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(expectedStatusCode);
        done();
      });
    });
  });

  it('defineRoute can define a DELETE route that responds with a desired status code', function (done) {
    var expectedStatusCode = 202;
    autoServer.defineRoute({
      route: '/routeWithStatus',
      verb: 'DELETE',
      statusCode: expectedStatusCode
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/routeWithStatus',
        method: 'DELETE'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(expectedStatusCode);
        done();
      });
    });
  });

  it('defineRoute can define a PATCH route that responds with a desired status code', function (done) {
    var expectedStatusCode = 202;
    autoServer.defineRoute({
      route: '/routeWithStatus',
      verb: 'PATCH',
      statusCode: expectedStatusCode
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/routeWithStatus',
        method: 'PATCH'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(expectedStatusCode);
        done();
      });
    });
  });

  it('defineRoute can define a POST route that calls the provided function', function (done) {
    autoServer.defineRoute({
      route: '/routeWillCall',
      verb: 'POST',
      callback: () => { done(); }
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/routeWillCall',
        method: 'POST'
      };
      request(requestOptions, function (err, res, body) {

      });
    });
  });

  it('getRequestBody returns the request body received by a GET route', function (done) {
    autoServer.defineRoute({
      route: '/someRoute',
      verb: 'GET'
    });
    autoServer.start({
      port: testPort
    }, function () {
      var testJson = {
        'some-property': 'some-value'
      };
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/someRoute/?someParameter=someValue',
        json: testJson,
        method: 'GET'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(autoServer.getRequestBody()).to.deep.equal(testJson);
        done();
      });
    });
  });

  it('getRequestBody returns the request body received by a POST route', function (done) {
    autoServer.defineRoute({
      route: '/someRoute',
      verb: 'POST'
    });
    autoServer.start({
      port: testPort
    }, function () {
      var testJson = {
        'some-property': 'some-value'
      };
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/someRoute',
        json: testJson,
        method: 'POST'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(autoServer.getRequestBody()).to.deep.equal(testJson);
        done();
      });
    });
  });

  it('getRequestBody returns the request body received by a PUT route', function (done) {
    autoServer.defineRoute({
      route: '/someRoute',
      verb: 'PUT'
    });
    autoServer.start({
      port: testPort
    }, function () {
      var testJson = {
        'some-property': 'some-value'
      };
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/someRoute',
        json: testJson,
        method: 'PUT'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(autoServer.getRequestBody()).to.deep.equal(testJson);
        done();
      });
    });
  });

  it('getRequestBody returns the request body received by a DELETE route', function (done) {
    autoServer.defineRoute({
      route: '/someRoute',
      verb: 'DELETE'
    });
    autoServer.start({
      port: testPort
    }, function () {
      var testJson = {
        'some-property': 'some-value'
      };
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/someRoute',
        json: testJson,
        method: 'DELETE'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(autoServer.getRequestBody()).to.deep.equal(testJson);
        done();
      });
    });
  });

  it('getRequestBody returns the request body received by a PATCH route', function (done) {
    autoServer.defineRoute({
      route: '/someRoute',
      verb: 'PATCH'
    });
    autoServer.start({
      port: testPort
    }, function () {
      var testJson = {
        'some-property': 'some-value'
      };
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/someRoute',
        json: testJson,
        method: 'PATCH'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(autoServer.getRequestBody()).to.deep.equal(testJson);
        done();
      });
    });
  });

  var queryString = '?parameterOne=valueOne&parameterTwo=valueTwo';

  it('getQueryParameters returns the query string parameters received by a GET route', function (done) {
    autoServer.defineRoute({
      route: '/someRoute',
      verb: 'GET'
    });

    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/someRoute' + queryString,
        method: 'GET'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(autoServer.getQueryParameters().parameterOne).to.equal('valueOne');
        expect(autoServer.getQueryParameters().parameterTwo).to.equal('valueTwo');
        done();
      });
    });
  });

  it('getQueryParameters returns the query string parameters received by a POST route', function (done) {
    autoServer.defineRoute({
      route: '/someRoute',
      verb: 'POST'
    });

    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/someRoute' + queryString,
        method: 'POST'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(autoServer.getQueryParameters().parameterOne).to.equal('valueOne');
        expect(autoServer.getQueryParameters().parameterTwo).to.equal('valueTwo');
        done();
      });
    });
  });

  it('getQueryParameters returns the query string parameters received by a PUT route', function (done) {
    autoServer.defineRoute({
      route: '/someRoute',
      verb: 'PUT'
    });

    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/someRoute' + queryString,
        method: 'PUT'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(autoServer.getQueryParameters().parameterOne).to.equal('valueOne');
        expect(autoServer.getQueryParameters().parameterTwo).to.equal('valueTwo');
        done();
      });
    });
  });

  it('getQueryParameters returns the query string parameters received by a DELETE route', function (done) {
    autoServer.defineRoute({
      route: '/someRoute',
      verb: 'DELETE'
    });

    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/someRoute' + queryString,
        method: 'DELETE'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(autoServer.getQueryParameters().parameterOne).to.equal('valueOne');
        expect(autoServer.getQueryParameters().parameterTwo).to.equal('valueTwo');
        done();
      });
    });
  });

  it('getQueryParameters returns the query string parameters received by a PATCH route', function (done) {
    autoServer.defineRoute({
      route: '/someRoute',
      verb: 'PATCH'
    });

    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: 'http://localhost:' + testPort + '/someRoute' + queryString,
        method: 'PATCH'
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(autoServer.getQueryParameters().parameterOne).to.equal('valueOne');
        expect(autoServer.getQueryParameters().parameterTwo).to.equal('valueTwo');
        done();
      });
    });
  });
});
