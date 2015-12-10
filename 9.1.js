/* eslint-env es6 */
'use strict';

const input = `Faerun to Tristram = 65
Faerun to Tambi = 129
Faerun to Norrath = 144
Faerun to Snowdin = 71
Faerun to Straylight = 137
Faerun to AlphaCentauri = 3
Faerun to Arbre = 149
Tristram to Tambi = 63
Tristram to Norrath = 4
Tristram to Snowdin = 105
Tristram to Straylight = 125
Tristram to AlphaCentauri = 55
Tristram to Arbre = 14
Tambi to Norrath = 68
Tambi to Snowdin = 52
Tambi to Straylight = 65
Tambi to AlphaCentauri = 22
Tambi to Arbre = 143
Norrath to Snowdin = 8
Norrath to Straylight = 23
Norrath to AlphaCentauri = 136
Norrath to Arbre = 115
Snowdin to Straylight = 101
Snowdin to AlphaCentauri = 84
Snowdin to Arbre = 96
Straylight to AlphaCentauri = 107
Straylight to Arbre = 14
AlphaCentauri to Arbre = 46`;


let map = {};

let actions = input.split('\n').map((row) => {
  let dist = +row.match(/\d+$/)[0];
  let dest = row.replace(/ =.*/, '').split(' to ');
  let start = dest[0];
  let end = dest[1];

  if (!map[start]) map[start] = {};
  if (!map[end]) map[end] = {};

  map[start][end] = map[end][start] = dist;
});

let cities = Object.keys(map);
let totals = [];

function totalDist(list) {
  return list.reduce((total, city, idx) => {
    let next = list[idx + 1];
    if (!next) return total;

    return total + map[city][next];
  }, 0);
}

function deepify(key, parents) {
  let dists = map[key];
  let toGo = cities.filter((city) => {
    return !~parents.indexOf(city);
  });

  if(!toGo.length) {
    totals.push({
      list: parents,
      dist: totalDist(parents),
    });
  }

  toGo.forEach((city) => {
    let newParents = parents.concat([city]);
    deepify(city, newParents);
  });
}

cities.forEach((start) => {
  deepify(start, [start]);
});


let shortest = totals.reduce((prev, curr) => {
  if (prev === false) return curr.dist;

  if (prev < curr.dist) return prev;

  return curr.dist;
}, false);

console.log('shortest', shortest);
