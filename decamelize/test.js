require('mocha');
var decamelize = require('./');
var assert = require('assert');

describe('decamelize', () => {
    it('expect right res', () => {
        assert.deepEqual(decamelize(''), '');
        assert.deepEqual(decamelize('unicornsAndRainbows'), 'unicorns_and_rainbows');
        assert.deepEqual(decamelize('UNICORNS AND RAINBOWS'), 'unicorns and rainbows');
        assert.deepEqual(decamelize('unicorns-and-rainbows'), 'unicorns-and-rainbows');
        assert.deepEqual(decamelize('thisIsATest'), 'this_is_a_test');
        assert.deepEqual(decamelize('thisIsATest', ' '), 'this is a test');
        assert.deepEqual(decamelize('thisIsATest', ''), 'thisisatest');
        assert.deepEqual(decamelize('unicornRainbow', '|'), 'unicorn|rainbow');
        assert.deepEqual(decamelize('myURLString', '_'), 'my_url_string');
        assert.deepEqual(decamelize('URLString', '_'), 'url_string');
        assert.deepEqual(decamelize('StringURL', '_'), 'string_url');
        assert.deepEqual(decamelize('thisHasSpecialCharactersLikeČandŠ', ' '), 'this has special characters like čand š');
    });
});