/* eslint-env es6 */
'use strict';

const fs = require('fs');

const input = fs.readFileSync('./8.in', 'utf8');

let total = input.split('\n').reduce((sums, row) => {
  if (!row) return sums;

  let a = '"' + row.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';

  sums.before += row.length;
  sums.after += a.length;

  console.log(row);
  console.log(a);
  console.log('\n\n\n');

  return sums;
}, {
  before: 0,
  after: 0,
});

console.log(total.after - total.before);
