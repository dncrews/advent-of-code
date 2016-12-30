
const fs = require('fs');

const input = fs.readFileSync('./7.in', 'utf8');

// const input = `
// aba[bab]xyz
// xyx[xyx]xyx
// aaa[kek]eke
// zazbz[bzb]cdb
// `;

const abaReg = /(\w)[^\1]\1/g;
const innerReg = /\[[^\]]+]/g;

const rows = input
  .split('\n')
  .filter(Boolean);

const findABA = (text) => {
  const pat = /(?=((\w)[^\2]\2))\w/g;
  const matches = [];
  let match;
  while ((match = pat.exec(text)) !== null) {
    if (match[1][0] !== match[1][1]) matches.push(match[1]);
  }
  return matches;
};

const separate = (text) => {
  const inners = (text.match(innerReg) || []);
  const outers = inners.reduce((prev, curr) => {
    return prev.replace(curr, '.');
  }, text).split('.');
  let allMatches = [];
  outers.forEach((outer) => {
    allMatches = allMatches.concat(findABA(outer));
  });
  const final = allMatches.filter((match) => {
    const idx = inners.join('').indexOf(`${ match[1] }${ match[0] }${ match[1] }`);
    return idx > -1;
  });
  return !!final.length;
};

const answer = rows.filter(separate).length;

console.info('answer', answer);
