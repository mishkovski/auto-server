var autoServer = require('../lib/auto-server');
var expect = require('chai').expect;
var http = require('http');

describe('auto-server', function() {
  it('exists', function() {
    expect(autoServer).to.not.equal(undefined);
  });

  it('exports module functions', function() {
    expect(autoServer.setup).to.not.equal(undefined);
    expect(autoServer.start).to.not.equal(undefined);
    expect(autoServer.addEndpoint).to.not.equal(undefined);
  });

  it('on start listens', function(done) {
    autoServer.start({}, function() {
      var options = {
        host: 'localhost',
        port: 7777,
        path: '/',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      var req = http.request(options, function(response) {
        expect(response.statusCode).to.equal(200);
        done();
      }).end();

    });
  });
});
