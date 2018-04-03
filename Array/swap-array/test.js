require('mocha');
var assert = require('assert');
var swap = require('./');

describe('swap-array', function () {

    it('swaps two array-items by its index-address', function () {
        var PrimArray = ['a', 'b', 'c'];
        assert.deepEqual(swap(PrimArray, 0, 2), ['c', 'b', 'a']);
    });

    it('doesnt change the state of the passed array, it just returns a new state', function () {
        var PrimArray = ['a', 'b', 'c'];
        swap(PrimArray, 0, 2);
        assert.deepEqual(PrimArray, ['a', 'b', 'c']);
    });

    it('throws err if no array is passed as first param', function () {
        assert.throws(function () {
            swap({}, 0, 0);
        }, /expect/i);

        assert.throws(function () {
            swap('', 0, 0);
        }, /expect/i);

        assert.throws(function () {
            swap(123, 0, 0);
        }, /expect/i);
    });

    it('swaps arrays with objects as items', function () {
        var PrimArray = [{
            id: 1,
            title: 'first'
        }, {
            id: 2,
            title: 'second'
        }];
        assert.deepEqual(swap(PrimArray, 0, 1), [{
            id: 2,
            title: 'second'
        }, {
            id: 1,
            title: 'first'
        }]);
    });

    it('doesnt change anything is caller and target is the same', function () {
        var PrimArray = ['a', 'b', 'c'];
        assert.deepEqual(swap(PrimArray, 1, 1), ['a', 'b', 'c']);
        assert.deepEqual(swap(PrimArray, 0, 0), ['a', 'b', 'c']);
    });
});