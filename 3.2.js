
const fs = require('fs');

const input = fs.readFileSync('./3.in', 'utf8');

const rows = input
  .split('\n')
  .filter(Boolean)
  .map((row) => row.match(/\d+/g).map((int) => parseInt(int, 10)));


let good = 0;

for (let i=0, l=rows.length; i<l; i++) {
  const col = i % 3;

  const start = i - col;
  const end = start + 3;
  const these = rows.slice(start, end);

  const triangle = [ these[0][col], these[1][col], these[2][col]];
  triangle.sort((a, b) => a - b);

  if (triangle[0] + triangle[1] > triangle[2]) good++;
}

console.info(`Good triangles: ${good}`);
