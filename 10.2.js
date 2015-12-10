/* eslint-env es6 */
'use strict';

const input = `1321131112`;


function lengthen(str) {
  let parts = str.match(/(\d)\1*/g);

  return parts.reduce((str, part) => {
    return str + part.length + part[0];
  }, '');
}

let str = input;

for (let i=0; i<50; i++) {
  str = lengthen(str);
}

console.log(str.length);
