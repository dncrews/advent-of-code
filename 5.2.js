
const crypto = require('crypto');
// const input = `abc`;
const input = `uqwqemis`;

// let found;

let chars = [];
let idx = 0;

while (chars.join('').length < 8) {
  // console.info(idx);
  let hash = crypto.createHash('md5').update(`${input}${idx++}`).digest('hex');
  if (hash.indexOf('00000') !== 0) continue;

  let pos = parseInt(hash[5], 10);
  if (isNaN(pos)) continue;
  if (pos > 7) continue;
  if (chars[pos]) continue;

  chars[pos] = hash[6];
  console.info(`pw: ${chars}`);
}

console.info('pw', chars.join(''));
