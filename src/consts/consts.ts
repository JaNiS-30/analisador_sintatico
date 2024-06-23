interface Grammar {
  [key: string]: string[];
}

export const grammar: Grammar = {
  S: ['aAc', 'Bb'],
  A: ['bCa', 'cS'],
  B: ['dAc', 'c'],
  C: ['bA', 'ε'],
};

export const first = {
  S: ['a', 'd', 'c'],
  A: ['b', 'c'],
  B: ['c', 'd'],
  C: ['b', 'ε'],
};

export const follow = {
  S: ['$', 'a', 'c'],
  A: ['a', 'c'],
  B: ['b'],
  C: ['a'],
};

interface ParsingTable {
  [key: string]: {
    [key: string]: string[];
  };
}

export const table: ParsingTable = {
  S: {
    a: ['a', 'A', 'c'],
    c: ['B', 'b'],
    d: ['B', 'b'],
  },
  A: {
    b: ['b', 'C', 'a'],
    c: ['c', 'S'],
  },
  B: {
    c: ['c'],
    d: ['d', 'A', 'c'],
  },
  C: {
    b: ['b', 'A'],
    $: ['ε'],
  },
};

export const terminals = ['a', 'b', 'c', 'd'];
export const nonTerminals = ['S', 'A', 'B', 'C'];
