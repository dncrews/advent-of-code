/* eslint-env es6 */
'use strict';

const crypto = require('crypto');

const input = `bgvyzdsv`;

let i = 1;
let hash;

while(i++) {
  hash = crypto.createHash('md5').update(input + i).digest('hex');
  if (hash.indexOf('00000') === 0) break;
}

console.log(i, hash);
