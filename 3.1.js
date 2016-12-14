
const fs = require('fs');

const input = fs.readFileSync('./3.in', 'utf8');

const rows = input
  .split('\n')
  .filter(Boolean)
  .map((row) => row.match(/\d+/g).map((int) => parseInt(int, 10)));


const good = rows.filter((row) => {
  if (!row) return false;
  let nums = row.sort((a, b) => a - b);
  return nums[0] + nums[1] > nums[2];
});

const answer = good.length;

console.info(`Good triangles: ${answer}`);
