const autoServer = require('../lib/auto-server');
const expect = require('chai').expect;
const http = require('http');
const request = require('request');
const localhost = 'http://localhost:';
const testPort = 7777;
const allExpressVerbs = ['get', 'post', 'put', 'head', 'delete', 'options', 'trace', 'copy', 'lock', 'mkcol', 'move', 'purge', 'propfind', 'proppatch', 'unlock', 'report', 'mkactivity', 'checkout', 'merge', 'm-search', 'notify', 'subscribe', 'unsubscribe', 'patch', 'search'];
const verbs = ['get', 'post', 'put', 'delete', 'patch'];
const someRoute = '/some-route';

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

  var runTestForValues = function (values, testFunction) {
    values.forEach(value => {
      it('works for ' + value, function (done) {
        testFunction(value, done);
      });
    });
  }

  function defineRouteTest(method, done) {
    autoServer.defineRoute({
      route: someRoute,
      verb: method
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: localhost + testPort + someRoute,
        method: method
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  }

  describe('defineRoute', function (done) {
    runTestForValues(verbs, defineRouteTest);
  });

  it('defineRoute by default defines a GET route', function (done) {
    autoServer.defineRoute({
      route: someRoute
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: localhost + testPort + someRoute
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  function defineRouteWithStatusCodeTest(method, done) {
    var expectedStatusCode = 202;
    autoServer.defineRoute({
      route: someRoute,
      verb: method,
      statusCode: expectedStatusCode
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: localhost + testPort + someRoute,
        method: method
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(expectedStatusCode);
        done();
      });
    });
  }

  describe('defineRoute with status code', function (done) {
    runTestForValues(verbs, defineRouteWithStatusCodeTest);
  });

  function defineRouteWithCallbackTest(method, done) {
    autoServer.defineRoute({
      route: someRoute,
      verb: method,
      callback: () => { done(); }
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: localhost + testPort + someRoute,
        method: method
      };
      request(requestOptions, function (err, res, body) {

      });
    });
  }

  describe('defineRoute with callback', function (done) {
    runTestForValues(verbs, defineRouteWithCallbackTest);
  });

  function getRequestBodyTest(method, done) {
    var expectedStatusCode = 202;
    autoServer.defineRoute({
      route: someRoute,
      verb: method
    });
    autoServer.start({
      port: testPort
    }, function () {
      var testJson = {
        'some-property': 'some-value'
      };
      var requestOptions = {
        uri: localhost + testPort + someRoute,
        json: testJson,
        method: method
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(autoServer.getRequestBody()).to.deep.equal(testJson);
        done();
      });
    });
  }

  describe('getRequestBody', function (done) {
    runTestForValues(verbs, getRequestBodyTest);
  });

  function getQueryParametersTest(method, done) {
    var queryString = '?parameterOne=valueOne&parameterTwo=valueTwo';
    var expectedStatusCode = 202;
    autoServer.defineRoute({
      route: someRoute,
      verb: method
    });
    autoServer.start({
      port: testPort
    }, function () {
      var requestOptions = {
        uri: localhost + testPort + someRoute + queryString,
        method: method
      };
      request(requestOptions, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(autoServer.getQueryParameters().parameterOne).to.equal('valueOne');
        expect(autoServer.getQueryParameters().parameterTwo).to.equal('valueTwo');
        done();
      });
    });
  }

  describe('getQueryParameters', function (done) {
    runTestForValues(verbs, getQueryParametersTest);
  });  
});
