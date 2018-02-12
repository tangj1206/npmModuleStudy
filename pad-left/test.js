require('mocha');
var pad = require('./');
var assert = require('assert');

describe('pad left', function () {
    it('should return the string when no padding amount is passed', function () {
        assert.deepEqual(pad('abc'), 'abc');
        assert.deepEqual(pad('abc', 0), 'abc');
    });

    it('should pad the specified number of zeros.', function () {
        assert.deepEqual(pad('abc', 10), '       abc');
        assert.deepEqual(pad('abc', 100), '                                                                                                 abc');
        assert.deepEqual(pad('abc', 300), '                                                                                                                                                                                                                                                                                                         abc');
    });

    it('should use the given character for padding.', function () {
        var str = 'abcde';
        assert.deepEqual(pad(str, 10, 0), '00000abcde');
        assert.deepEqual(pad(str, 10, '0'), '00000abcde');
        assert.deepEqual(pad(str, 10, '~'), '~~~~~abcde');
        assert.deepEqual(pad(str, 100, '~'), '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~abcde');
        assert.deepEqual(pad(str, 300, '~'), '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~abcde');
    });

    it('should coerce number to string before padding.', function () {
        assert.deepEqual(pad(123), '123');
        assert.deepEqual(pad(123, 5), '  123');
        assert.deepEqual(pad(123, 10, '0'), '0000000123');
    });
});