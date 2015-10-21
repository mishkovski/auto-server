var autoServer = require('../lib/auto-server');
var expect = require('chai').expect;

describe('auto-server', function(){
    it('exists', function(){
        expect(autoServer).to.not.equal(undefined);
    });

    it('exports module functions', function(){
        expect(autoServer.setup).to.not.equal(undefined);
        expect(autoServer.start).to.not.equal(undefined);
        expect(autoServer.addEndpoint).to.not.equal(undefined);
    });
});
