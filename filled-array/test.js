'use strict';

require('mocha');
var assert = require('assert');
var fn = require('./');

function indexPlus(index) {
    return index + 1;
}

function fizzBuzz(index) {
    return (++index % 3 ? '' : 'Fizz') + (index % 5 ? '' : 'Buzz') || index;
}

function comprehensive(index, length, partial) {
    return partial.indexOf(index) === -1 ? index + 1 : length;
}

describe('filled', function () {
    it('should filled with empty:', function () {
        assert.deepEqual(fn('a', 0), []);
    });

    it('should filled with a:', function () {
        assert.deepEqual(fn('a', 1), ['a']);
        assert.deepEqual(fn('a', 2), ['a', 'a']);
        assert.deepEqual(fn('a', 5), ['a', 'a', 'a', 'a', 'a']);
    });

    it('should filled with foo:', function () {
        assert.deepEqual(fn('foo', 2), ['foo', 'foo']);
    });

    it('should filled with function:', function () {
        assert.deepEqual(fn(indexPlus, 5), [1, 2, 3, 4, 5]);
    });

    it('should filled with function:', function () {
        assert.deepEqual(fn(indexPlus, 5), [1, 2, 3, 4, 5]);
        assert.deepEqual(fn(fizzBuzz, 15), [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']);
        assert.deepEqual(fn(comprehensive, 5), [1, 5, 3, 5, 5]);
    });
});

// test(t => {
//     t.deepEqual(fn('a', 0), []);
//     t.deepEqual(fn('a', 1), ['a']);
//     t.deepEqual(fn('a', 2), ['a', 'a']);
//     t.deepEqual(fn('a', 5), ['a', 'a', 'a', 'a', 'a']);
//     t.deepEqual(fn('foo', 2), ['foo', 'foo']);
//     t.deepEqual(fn(0, 2), [0, 0]);
//     t.deepEqual(fn(indexPlus, 5), [1, 2, 3, 4, 5]);
//     t.deepEqual(fn(fizzBuzz, 15), [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 13, 14, 'FizzBuzz']);
//     t.deepEqual(fn(comprehensive, 5), [1, 5, 3, 5, 5]);
// });