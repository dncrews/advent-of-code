/* eslint-disable */

const crypto = require('crypto');
// const input = `abc`;
const input = `uqwqemis`;

// let found;

let pw = '';
let idx = 0;

while (pw.length < 8) {
  let hash = crypto.createHash('md5').update(`${input}${idx}`).digest('hex');
  if (hash.indexOf('00000') === 0) pw += hash[5];
  idx++;
}

console.info('pw', pw)
