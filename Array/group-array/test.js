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
            ]
        });
    });

    it('should create groups based on the value of the specified property when the value has dots', function () {
        var arr = [{
                tag: 'one.foo',
                content: 'A'
            },
            {
                tag: 'one.foo',
                content: 'B'
            },
            {
                tag: 'two.bar',
                content: 'C'
            },
            {
                tag: 'two.bar',
                content: 'D'
            },
            {
                tag: 'three.baz',
                content: 'E'
            },
            {
                tag: 'three.baz',
                content: 'F'
            }
        ];

        var actual = groupArray(arr, 'tag');

        assert.deepEqual(actual, {
            'one.foo': [{
                    tag: 'one.foo',
                    content: 'A'
                },
                {
                    tag: 'one.foo',
                    content: 'B'
                }
            ],
            'two.bar': [{
                    tag: 'two.bar',
                    content: 'C'
                },
                {
                    tag: 'two.bar',
                    content: 'D'
                }
            ],
            'three.baz': [{
                    tag: 'three.baz',
                    content: 'E'
                },
                {
                    tag: 'three.baz',
                    content: 'F'
                }
            ]
        });
    });

    it('should create groups based on numberic values of the specified property', function () {
        var arr = [{
                tag: 1,
                content: 'A'
            },
            {
                tag: 1,
                content: 'B'
            },
            {
                tag: 2,
                content: 'C'
            },
            {
                tag: 2,
                content: 'D'
            },
            {
                tag: 3,
                content: 'E'
            },
            {
                tag: 3,
                content: 'F'
            }
        ];

        var actual = groupArray(arr, 'tag');
        assert.deepEqual(actual, {
            '1': [{
                    tag: 1,
                    content: 'A'
                },
                {
                    tag: 1,
                    content: 'B'
                }
            ],
            '2': [{
                    tag: 2,
                    content: 'C'
                },
                {
                    tag: 2,
                    content: 'D'
                }
            ],
            '3': [{
                    tag: 3,
                    content: 'E'
                },
                {
                    tag: 3,
                    content: 'F'
                }
            ]
        });
    });

    it('should create groups based on boolean values of the specified property', function () {
        var arr = [{
                tag: true,
                content: 'A'
            },
            {
                tag: false,
                content: 'B'
            },
            {
                tag: true,
                content: 'C'
            },
            {
                tag: false,
                content: 'D'
            },
            {
                tag: true,
                content: 'E'
            },
            {
                tag: false,
                content: 'F'
            }
        ];

        var actual = groupArray(arr, 'tag');
        assert.deepEqual(actual, {
            'true': [{
                    tag: true,
                    content: 'A'
                },
                {
                    tag: true,
                    content: 'C'
                },
                {
                    tag: true,
                    content: 'E'
                }
            ],
            'false': [{
                    tag: false,
                    content: 'B'
                },
                {
                    tag: false,
                    content: 'D'
                },
                {
                    tag: false,
                    content: 'F'
                }
            ]
        });
    });

    it('should  support passing the property as an array', function () {
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

        var actual = groupArray(arr, ['tag']);
        assert.deepEqual(actual, {
            'one': [{
                    tag: 'one',
                    content: 'A'
                },
                {
                    tag: 'one',
                    content: 'B'
                }
            ],
            'two': [{
                    tag: 'two',
                    content: 'C'
                },
                {
                    tag: 'two',
                    content: 'D'
                }
            ],
            'three': [{
                    tag: 'three',
                    content: 'E'
                },
                {
                    tag: 'three',
                    content: 'F'
                }
            ]
        });
    });
    
});