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
  return Object.keys(obj).reduce((sum, key) => {
    let value = obj[key];
    sum += reducto(value) || 0;
    return sum;
  }, 0);
}

function reducto(thing) {
  if (typeof thing === 'string') return 0;
  if (typeof thing === 'number') return thing;
  if (Array.isArray(thing)) return arrayReducto(thing);

  return objReducto(thing);
}

console.log(reducto(input));
