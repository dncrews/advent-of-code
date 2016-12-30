
const fs = require('fs');

const width = 50;
const height = 6;
const input = fs.readFileSync('./8.in', 'utf8');

// const width = 7;
// const height = 3;

// const input = `
// rect 3x2
// rotate column x=1 by 1
// rotate row y=0 by 4
// rotate column x=1 by 1
// `;

const recReg = /rect (\d+)x(\d+)/;
const rotReg = /rotate (\w+) \w=(\d+) by (\d+)/;

const rows = input
  .split('\n')
  .filter(Boolean);

const grid = [];
for (let y = 0; y < height; y++) {
  grid[y] = [];

  for (let x = 0; x < width; x++) {
    grid[y][x] = '.';
  }
}


const rect = (x, y) => {
  x = parseInt(x, 10);
  y = parseInt(y, 10);

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      grid[j][i] = '#';
    }
  }
};

const shiftRow = (y, by) => {
  y = parseInt(y, 10);
  by = parseInt(by, 10);

  while (by--) {
    const end = grid[y].pop();
    grid[y].unshift(end);
  }
};

const shiftCol = (x, by) => {
  x = parseInt(x, 10);
  by = parseInt(by, 10);

  while (by--) {
    const end = grid[height - 1][x];
    for (let i = (height - 1); i >= 0; i--) {
      const next = grid[i - 1] === undefined ? end : grid[i - 1][x];
      grid[i][x] = next;
    }
  }
};

const textify = () => {
  return `\n${ grid.map((row) => row.join('')).join('\n') }\n`;
};

const rotateMap = {
  column: shiftCol,
  row: shiftRow,
};

rows.forEach((row) => {
  if (recReg.test(row)) {
    const matches = row.match(recReg);
    rect(matches[1], matches[2]);
  } else if (rotReg.test(row)) {
    const matches = row.match(rotReg);
    rotateMap[matches[1]](matches[2], matches[3]);
  }
});

console.log(textify());

const answer = textify().match(/#/g).length;

if (answer !== 6) throw new Error(`NOPE ${ answer }`);

