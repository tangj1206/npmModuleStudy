'use strict';
module.exports = function (Arr, Caller, Target) {
    var Instance = Arr.constructor();
    var Stash = Arr;

    var InstanceType = Array.isArray(Instance) ? 'array' : typeof Instance;

    // Check types and throw err if no arr is passed
    if (InstanceType !== 'array') {
        throw 'expect SwapArray expects a array as first param'
    };

    // Copy the Arr-Content into new instance - so we dont overwhrite passed array
    Stash.map(function (s, i) {
        Instance[i] = s;
    });

    // Update indexes 
    Instance[Caller] = Instance.splice(Target, 1, Instance[Caller])[0];

    return Instance;
}