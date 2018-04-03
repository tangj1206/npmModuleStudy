require('mocha');
var assert = require('assert');
var mirrarray = require('./');
describe('mirrarray', () => {

  it('Returns empty object for empty array input', () => {
    assert.deepEqual(mirrarray([]), {});
  });

  it('Returns key mirror object as expected for an array of strings', () => {
    const input = ['this', 'that', 'another', 'again'];
    const output = {
      'this': 'this',
      'that': 'that',
      'another': 'another',
      'again': 'again'
    }
    assert.deepEqual(mirrarray(input), output);
  });

  it('Returns key mirror object as expected for an array of numbers', () => {
    const input = [1, 2, 3, 4];
    const output = {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4'
    };
    assert.deepEqual(mirrarray(input), output);
  });

  it('Throws error if input type is not Array', () => {
    const invalidInputs = [{}, 'a_string', 1234, true, undefined, null];
    invalidInputs.forEach(invalidInput => {
      assert.throws(() => {
        mirrarray(invalidInput);
      }, /\[ERR\]/i);
    });
  });

  const validInputs = ['a', 'b', 'c'];
  it('Throws error if input array contains element of a type that cannot be (intuitively) coerced into a string', () => {
    // "Intuitively" because you could JSON.stringify an object to use as a key, but this wouldn't be a particularly sensible use case.
    // Double-empty array here so that Array.prototype.concat doesn't flatten it. Technically it's an object anyway, but just to be thorough.
    const invalidInputs = [{},
      [
        []
      ]
    ];
    invalidInputs.forEach(invalidInput => {
      assert.throws(() => {
        mirrarray(invalidInput);
      }, /\[ERR\]/i);
    });
  });

  it('Will coerce null, undefined & booleans to strings for use as keys', () => {
    [null, undefined, false, true].forEach(val => {
      assert.deepEqual(mirrarray(validInputs.concat(val)), {
        'a': 'a',
        'b': 'b',
        'c': 'c',
        [val]: val
      });
    });
  });

  it('Will allow for multiples of the same key as long as they\'re the same type', () => {
    assert.deepEqual(mirrarray(['a', 'a', 'a']), {
      'a': 'a'
    });
    assert.deepEqual(mirrarray([1, 1, 1]), {
      '1': '1'
    });
  });

  it('Will not allow for distinct elements to coerce to the same string', () => {
    assert.throws(() => {
      mirrarray(validInputs.concat(['true', true]));
    }, /\[ERR\]/);

    assert.throws(() => {
      mirrarray(validInputs.concat(['undefined', undefined]));
    }, /\[ERR\]/);

    assert.throws(() => {
      mirrarray(validInputs.concat(['null', null]));
    }, /\[ERR\]/);

    assert.throws(() => {
      mirrarray(validInputs.concat(['1234', 1234]));
    }, /\[ERR\]/);
  });
})