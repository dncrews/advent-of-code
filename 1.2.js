
const input = 'R2, L1, R2, R1, R1, L3, R3, L5, L5, L2, L1, R4, R1, R3, L5, L5, R3, L4, L4, R5, R4, R3, L1, L2, R5, R4, L2, R1, R4, R4, L2, L1, L1, R190, R3, L4, R52, R5, R3, L5, R3, R2, R1, L5, L5, L4, R2, L3, R3, L1, L3, R5, L3, L4, R3, R77, R3, L2, R189, R4, R2, L2, R2, L1, R5, R4, R4, R2, L2, L2, L5, L1, R1, R2, L3, L4, L5, R1, L1, L2, L2, R2, L3, R3, L4, L1, L5, L4, L4, R3, R5, L2, R4, R5, R3, L2, L2, L4, L2, R2, L5, L4, R3, R1, L2, R2, R4, L1, L4, L4, L2, R2, L4, L1, L1, R4, L1, L3, L2, L2, L5, R5, R2, R5, L1, L5, R2, R4, R4, L2, R5, L5, R5, R5, L4, R2, R1, R1, R3, L3, L3, L4, L3, L2, L2, L2, R2, L1, L3, R2, R5, R5, L4, R3, L3, L4, R2, L5, R5';

const inputs = input.split(', ');
const dirs = {
  N: {
    L: 'W',
    R: 'E',
    dir: 'NS',
    mult: 1,
  },
  S: {
    L: 'E',
    R: 'W',
    dir: 'NS',
    mult: -1,
  },
  E: {
    L: 'N',
    R: 'S',
    dir: 'EW',
    mult: 1,
  },
  W: {
    L: 'S',
    R: 'N',
    dir: 'EW',
    mult: -1,
  },
};

const visits = [ 'NS: 0, EW: 0' ];
let found = false;

const end = inputs.reduce((coord, item) => {
  if (found) return coord;
  const next = dirs[coord.facing][item[0]];
  coord.facing = next;
  const config = dirs[next];

  const {
    dir,
    mult,
  } = config;

  for (let i = 0, l = parseInt(item.match(/\d+/)[0], 10); i < l; i++) {
    coord[dir] += mult;
    const visit = `NS: ${ coord.NS }, EW: ${ coord.EW }`;
    if (visits.indexOf(visit) !== -1) {
      found = coord;
      return coord;
    }
    visits.push(visit);
  }

  return coord;
}, {
  NS: 0,
  EW: 0,
  facing: 'N',
});

console.info(Math.abs(end.NS) + Math.abs(end.EW));
