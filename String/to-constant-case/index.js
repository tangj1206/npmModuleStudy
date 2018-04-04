var snake = require('to-snake-case');

/** 
 * Export.
 */

 module.exports = toConstantCase;
/**
 * Convert a `string`  to cnstant case.
 * 
 * @param {String} string
 * @return {String}
 */

 function toConstantCase(string){
     return snake(string).toUpperCase()
 }