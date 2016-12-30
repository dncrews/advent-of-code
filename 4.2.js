/* eslint-disable */

const fs = require('fs');

const input = fs.readFileSync('./4.in', 'utf8');
const rows = input.split('\n');

const parse = (raw) => {
  const row = raw.split('-');
  const hash = row.pop();
  const id = parseInt(hash, 10);
  const most = hash.match(/[a-z]+/)[0];

  const content = row.join('').split('');
  const info = {
    id,
    most,
    raw: row.join('-'),
  };

  info.letters = content.reduce((prev, lettah) => {
    if (!prev[lettah]) prev[lettah] = 0;
    prev[lettah]++;
    return prev;
  }, {});

  return info;
};

const valid = (row) => {
  const { letters } = row;
  let order = Object.keys(letters).sort((a, b) => {
    let aCount = letters[a];
    let bCount = letters[b];

    if (aCount < bCount) return 1;
    if (aCount > bCount) return -1;

    if (a > b) return 1;
    if (a < b) return -1;
  }).join('');
  return order.indexOf(row.most) === 0;
};

const decode = (row) => {
  const {
    raw,
    id,
  } = row;

  const text = raw
    .split('')
    .map((letter) => {
      if (letter === '-') return ' ';
      let code = letter.charCodeAt(0);
      code += id;
      while (code > 122) {
        code -= 26;
      }

      return String.fromCharCode(code);
    })
    .join('');

  row.text = text;
  return row;
};

const find = ({ text }) => text === 'northpole object storage';

const result = rows
  .filter(Boolean)
  .map(parse)
  .filter(valid)
  .map(decode)
  .filter(find);

console.info(result[0].id);
