/* eslint-env es6 */
'use strict';

const input = require('./12.json');

function arrayReducto(list) {
  return list.reduce((sum, value) => {
    sum += reducto(value) || 0;
    return sum;
  }, 0);
}

function objReducto(obj) {
  let sum = Object.keys(obj).reduce((sum, key) => {
    if (sum === 'invalid') return 'invalid';

    let value = obj[key];
    if (value === 'red') return 'invalid';

    sum += reducto(value) || 0;
    return sum;
  }, 0);

  return sum === 'invalid' ? 0 : sum;
}

function reducto(thing) {
  if (typeof thing === 'string') return 0;
  if (typeof thing === 'number') return thing;
  if (Array.isArray(thing)) return arrayReducto(thing);

  return objReducto(thing);
}

console.log(reducto(input));
