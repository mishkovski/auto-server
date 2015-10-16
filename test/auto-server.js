var autoServer = require('../lib/auto-server');
var expect = require('chai').expect;

describe('auto-server', function(){
    it('exists', function(){
        expect(autoServer).to.not.equal(undefined);
    });
});
