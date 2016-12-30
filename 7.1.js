
const fs = require('fs');

const input = fs.readFileSync('./7.in', 'utf8');

const rows = input
  .split('\n')
  .filter(Boolean);

const abbaReg = /(\w)(\w)\2\1/g;
const findABBA = (text) => {
  const matches = (text.match(abbaReg) || []).filter((abba) => {
    return abba[0] !== abba[1];
  });
  return !!matches.length;
};

const innerReg = /\[[^\]]+]/g;
const checkInner = (text) => {
  const inners = text.match(innerReg) || [];
  const matches = findABBA(inners.join(''));
  return !matches;
};

const answer = rows
  .filter((row) => {
    const a = findABBA(row);
    return a;
  })
  .filter((row) => {
    const a = checkInner(row);
    return a;
  })
  .length;

console.info('answer', answer);
