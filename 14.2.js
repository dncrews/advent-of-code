/* eslint-env es6 */
'use strict';

const input = `Vixen can fly 8 km/s for 8 seconds, but then must rest for 53 seconds.
Blitzen can fly 13 km/s for 4 seconds, but then must rest for 49 seconds.
Rudolph can fly 20 km/s for 7 seconds, but then must rest for 132 seconds.
Cupid can fly 12 km/s for 4 seconds, but then must rest for 43 seconds.
Donner can fly 9 km/s for 5 seconds, but then must rest for 38 seconds.
Dasher can fly 10 km/s for 4 seconds, but then must rest for 37 seconds.
Comet can fly 3 km/s for 37 seconds, but then must rest for 76 seconds.
Prancer can fly 9 km/s for 12 seconds, but then must rest for 97 seconds.
Dancer can fly 37 km/s for 1 seconds, but then must rest for 36 seconds.`;


let maxTime = 2503;

let data = input.split('\n').map((row) => {
  let deer = {};

  deer.name = row.match(/^\w+/)[0];
  deer.speed = +row.match(/\d+/)[0];
  deer.fly = +row.match(/\d+/g)[1];
  deer.rest = +row.match(/\d+/g)[2];
  deer.pos = 0;
  deer.toRest = 0;
  deer.toFly = deer.fly;
  deer.points = 0;
  return deer;
});

function getFurthest() {
  return data.reduce((prev, deer) => {
    if (deer.pos > prev.pos) return deer;

    return prev;
  }, { pos: 0 });
}

function getWinner() {
  return data.reduce((prev, deer) => {
    if (deer.points > prev.points) return deer;

    return prev;
  }, { points: 0 });
}

while (maxTime--) {
  data.forEach((deer) => {
    if (deer.toFly) {
      deer.pos += deer.speed;
      deer.toFly--;
      if (deer.toFly === 0) deer.toRest = deer.rest;
    } else {
      if (deer.toRest) {
        deer.toRest--;
        if (deer.toRest === 0) deer.toFly = deer.fly;
      } else {
        console.log('something is wrong');
      }
    }
  });

  getFurthest().points++;
}


console.log(getWinner());

// let

// while (maxTime--) {

// }
