
const fs = require('fs');

// let answer = 0;
// answer = 0;

let input = fs.readFileSync('./9.in', 'utf8');

input = input
  .split('\n')
  .filter(Boolean)
  .join('\n');

const repeat = (text, cnt) => {
  const repped = new Array(...Array(cnt)).map(() => text.replace(/\(/g, '∑')).join('');
  return repped;
};

function decompress(text) {
  let matches;
  const reg = /\((\d+)x(\d+)\)/;
  while (matches = reg.exec(text)) {
    const list = text.split('');
    const idx = text.indexOf(matches[0]);
    const start = idx + matches[0].length;
    const end = start + parseInt(matches[1], 10);
    const rep = repeat(text.substring(start, end), parseInt(matches[2], 10));

    list.splice(idx, (end - idx), rep);
    text = list.join('');
    reg.lastIndex = text.indexOf(rep) + rep.length;
  }

  return text.replace(/∑/g, '(');
}


const tests = [
  {
    in: 'ADVENT',
    out: 'ADVENT',
  },
  {
    in: 'A(1x5)BC',
    out: 'ABBBBBC',
  },
  {
    in: '(3x3)XYZ',
    out: 'XYZXYZXYZ',
  },
  {
    in: 'A(2x2)BCD(2x2)EFG',
    out: 'ABCBCDEFEFG',
  },
  {
    in: '(6x1)(1x3)A',
    out: '(1x3)A',
  },
  {
    in: 'X(8x2)(3x3)ABCY',
    out: 'X(3x3)ABC(3x3)ABCY',
  },
];

tests.forEach((test) => {
  const answer = decompress(test.in);
  if (answer !== test.out) throw new Error(`${ test.in } didn't work!`);
  console.info(`${ test.in } decompresses to ${ answer.length }`);
});

const answer = decompress(input);
console.info(`input decompresses to ${ answer.length }`);
// if (answer !== 6) throw new Error(`NOPE ${ answer }`);

