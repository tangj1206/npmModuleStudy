require('mocha');
var assert = require('assert');
var mapArray = require('./');

describe('mapArray', function () {
    const obj = {
        name: 'Giorgio',
        surname: 'Bianchi'
    };
    const result = mapArray(obj, function (key, value) {
        return key + ' ' + value;
    });
    it('should return map:', function () {
        assert.deepEqual(result, ['name Giorgio', 'surname Bianchi']);
    });
});