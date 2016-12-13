/* eslint-env es6 */
'use strict';

const input = `cqjxxyzz`;

let numbers = input.split('').map((letter) => {
  return letter.charCodeAt(0);
});

function sequenceTest(numbers) {
  for (let i=0, l=(numbers.length - 2); i<l; i++) {

    if (numbers[i] + 1 === numbers[i + 1] && numbers[i] + 2 === numbers[i + 2]) return true;
  }

  return false;
}

function getWord() {
  return numbers.map((number) => {
    return String.fromCharCode(number);
  }).join('');
}

function wordTest() {
  let word = getWord();

  // unique
  if (word === input) return false;

  // No i, l, o
  if (~numbers.indexOf(105) || ~numbers.indexOf(108) || ~numbers.indexOf(111)) return false;

  // sequence of numbers
  if (!sequenceTest(numbers)) return false;

  // At least 2 doubles
  if (!word.match(/(\w)\1.*(\w)\2/)) return false;

  return true;
}

function fixLetter(num) {
  let pos = numbers.indexOf(num);

  // if it's found
  if (pos > -1) {
    // It gets increased
    numbers[pos]++;

    // And every letter after it starts at 'a'
    for (let i=pos+1, l=numbers.length; i<l; i++) {
      numbers[i] = 97;
    }
  }
}

function shortCut() {
  fixLetter(105);
  fixLetter(108);
  fixLetter(111);
}


function incrementAll() {
  let wrapped = true;
  let idx = 0;

  shortCut();

  let word = getWord();

  while (wrapped) {
    wrapped = false;

    let pos = numbers.length - ((idx++ % numbers.length) + 1);

    if (++numbers[pos] > 122) {
      numbers[pos] = 97;
      wrapped = true;
    }
  }
}

let idx = 0;

while (!wordTest()) {
  incrementAll()
}

console.log(getWord());
