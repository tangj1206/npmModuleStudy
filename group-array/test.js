require('mocha');
var groupArray = require('./');
var assert = require('assert');

describe('group-array', () => {
    it('should throw an error when invalid args are passed:', function () {
        assert.throws(function () {
            groupArray('');
        }, 'group-array expects an array.');
    });

    it('should return an empty array when an empty array is passed:', function () {
        assert.deepEqual(groupArray([]), []);
    });

    it('should return the original array when no grouping properties are passed:', function () {
        assert.deepEqual(groupArray(['a', 'b', 'c']), ['a', 'b', 'c']);
    });

    it('should create groups based on the value of the specified property', function () {
        var arr = [{
                tag: 'one',
                content: 'A'
            },
            {
                tag: 'one',
                content: 'B'
            },
            {
                tag: 'two',
                content: 'C'
            },
            {
                tag: 'two',
                content: 'D'
            },
            {
                tag: 'three',
                content: 'E'
            },
            {
                tag: 'three',
                content: 'F'
            }
        ];

        var actual = groupArray(arr, 'tag');

        assert.deepEqual(actual, {
            one: [{
                    tag: 'one',
                    content: 'A'
                },
                {
                    tag: 'one',
                    content: 'B'
                }
            ],
            two: [{
                    tag: 'two',
                    content: 'C'
                },
                {
                    tag: 'two',
                    content: 'D'
                }
            ],
            three: [{
                    tag: 'three',
                    content: 'E'
                },
                {
                    tag: 'three',
                    content: 'F'
                }
            ],
        });
    });
});