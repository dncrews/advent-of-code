
const fs = require('fs');

// const input = fs.readFileSync('./6.in.fake', 'utf8');
const input = fs.readFileSync('./6.in', 'utf8');
const rows = input
  .split('\n')
  .filter(Boolean)
  .map((str) => {
    return str.split('');
  });

const columns = [];

for (let i = 0, l = rows.length; i < l; i++) {
  const row = rows[i];

  for (let j = 0, m = row.length; j < m; j++) {
    const letter = row[j];
    const column = columns[j] || (columns[j] = []);

    column.push(letter);
  }
}

// columns.forEach((col) => col.sort());

const answer = columns
  .map((col) => {
    col.sort();
    console.info(col.join(''));

    const counts = {};
    col.forEach((letter) => {
      if (!counts[letter]) counts[letter] = 0;
      counts[letter]++;
    });

    console.info(counts);
    return Object.keys(counts)
      .reduce((prev, curr) => {
        if (counts[curr] > prev.v) {
          prev.k = curr;
          prev.v = counts[curr];
        }
        return prev;
      }, { v: 0 });
  })
  .map((item) => {
    return item.k;
  })
  .join('');

// if (answer !== 'easter') throw new Error('NOPE');

console.info(answer);
