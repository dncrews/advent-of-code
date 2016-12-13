/* eslint-env es6 */
'use strict';

// const input = `Sprinkles: capacity 2, durability 0, flavor -2, texture 0, calories 3
// Butterscotch: capacity 0, durability 5, flavor -3, texture 0, calories 3
// Chocolate: capacity 0, durability 0, flavor 5, texture -1, calories 8
// Candy: capacity 0, durability -1, flavor 0, texture 5, calories 8`;

const input = `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`;


let map = {};

input.split('\n').forEach((line) => {
  let name = line.match(/^\w*/)[0];
  line = line.replace(name + ': ', '');
  let parts = line.split(', ');

  let item = map[name] = {};

  parts.map((part) => {
    let pieces = part.split(' ');
    item[pieces[0]] = parseInt(pieces[1]);
  });
});

let strs = [];
let ingredients = Object.keys(map);

// function asdf(list) {
//   let str = list.toString();
//   if (~strs.indexOf(str)) return [];
//   let total = [];

//   strs.push(str);
//   total.push(list);
//   for (let i=1, l=list.length; i<l; i++) {
//     let _list = list.concat();
//     _list.splice(i, 1);
//     total = total.concat(asdf(_list));
//   }

//   return total;
// }

// let combinations = ingredients.reduce((prev, curr, idx, list) => {
//   prev = prev.concat(asdf(list.slice(idx)));
//   return prev;
// }, [])

// console.log(combinations);

// function getTotal(list) {
//   for (let i=0; i<=100; i++) {

//   }
// }

// console.log(getTotal(ingredients));

let combinations = [];
let passes = 0;

let sample = {
  Butterscotch: 44,
  Cinnamon: 56,
};

function calculate(obj) {
  let keys = Object.keys(obj);

  let capacity = (map[keys[0]].capacity * obj[keys[0]]) + (map[keys[1]].capacity * obj[keys[1]]);
  let durability = (map[keys[0]].durability * obj[keys[0]]) + (map[keys[1]].durability * obj[keys[1]]);
  let flavor = (map[keys[0]].flavor * obj[keys[0]]) + (map[keys[1]].flavor * obj[keys[1]]);
  let texture = (map[keys[0]].texture * obj[keys[0]]) + (map[keys[1]].texture * obj[keys[1]]);

  return capacity * durability * flavor * texture;
}

console.log(calculate(sample));





// function combine(ingredients, total) {
//   let list = []
//   for (let i=0; i<=total; i++) {
//     console.log(passes++);
//     list.push({
//       [ingredients[0]]: i
//     });
//     list = list.concat(combine(ingredients.slice(1), total - i));
//   }
//   return list;
// }

// combinations = combinations.concat(combine(ingredients, 100));

// console.log(combinations);
