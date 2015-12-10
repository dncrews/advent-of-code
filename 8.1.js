/* eslint-env es6 */
'use strict';

const fs = require('fs');

const input = fs.readFileSync('./8.in', 'utf8');

let total = input.split('\n').reduce((sums, row) => {
  if (!row) return sums;

  sums.before += row.length;
  let a = eval(row);
  sums.after += a.length;

  return sums;
}, {
  before: 0,
  after: 0,
});

console.log(total.before - total.after);
