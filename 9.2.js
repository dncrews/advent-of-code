
const fs = require('fs');

// let answer = 0;
// answer = 0;

let input = fs.readFileSync('./9.in', 'utf8');

input = input
  .split('\n')
  .filter(Boolean)
  .join('\n');

const repeat = (text, cnt) => {
  const repped = new Array(...Array(cnt)).map(() => text).join('');
  return repped;
};

function count(text) {
  let total = 0;
  const weights = new Array(...Array(text.length)).map(() => 1);
  const reg = /\((\d+)x(\d+)\)/;

  let i = 0;
  const length = text.length;

  while (i < length) {
    const letter = text[i];
    if (letter === '(') {
      const matches = text.substring(i).match(reg);
      const matchLength = matches[0].length;

      const start = i + matchLength;
      const end = start + parseInt(matches[1], 10);

      for (let j = start; j < end; j++) {
        weights[j] *= parseInt(matches[2], 10);
      }

      i += matchLength;
      continue;
    }

    total += weights[i];
    i++;
  }
  return total;
}

const tests = [
  {
    in: 'A(1x5)BC',
    out: 'ABBBBBC',
  },
  {
    in: '(3x3)XYZ',
    out: 'XYZXYZXYZ',
  },
  {
    in: 'X(8x2)(3x3)ABCY',
    out: 'XABCABCABCABCABCABCY',
  },
];

tests.forEach((test) => {
  const answer = count(test.in);
  if (answer !== test.out.length) {
    console.info(`expected ${ test.out.length }`);
    console.info(`got ${ answer }`);
    throw new Error(`${ test.in } didn't work!`);
  }
  console.info(`${ test.in } decompresses to ${ answer }`);
});

const answer = count(input);
console.info(`input decompresses to ${ answer }`);

