
const fs = require('fs');

const input = fs.readFileSync('./4.in', 'utf8');
const rows = input.split('\n');

const result = rows
  .filter(Boolean)
  .map((raw) => {
    const row = raw.split('-');
    const hash = row.pop();
    const val = parseInt(hash, 10);
    const most = hash.match(/[a-z]+/)[0];
    // const content = row.join('').split('').sort().join('');
    const content = row.join('').split('');
    const info = {
      val,
      most,
    };

    info.letters = content.reduce((prev, lettah) => {
      if (!prev[lettah]) prev[lettah] = 0;
      prev[lettah]++;
      return prev;
    }, {});

    return info;
  })
  .filter((row) => {
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
  })
  .reduce((prev, curr) => {
    prev += curr.val
    return prev;
  }, 0);

console.info(result);
