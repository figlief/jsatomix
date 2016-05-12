'use strict'
/**
## imagenames

Given an atom-spec return a list of image names in increasing z-index order that are required to create a visual representation of an atom.
*/

const atom_kind = {
  '1': 'atom-h', // hydrogen
  '2': 'atom-c', // carbon
  '3': 'atom-o', // oxygen
  '4': 'atom-n', // nitrogen
  '5': 'atom-s', // sulphur
  '6': 'atom-f', // fluorine
  '7': 'atom-cl', // chlorine
  '8': 'atom-br', // bromine
  '9': 'atom-p', // phosphorus
  'o': 'atom-crystal',
  'A': 'connector-horizontal',
  'B': 'connector-slash',
  'C': 'connector-vertical',
  'D': 'connector-backslash',
  'E': 'crystal-E',
  'F': 'crystal-F',
  'G': 'crystal-G',
  'H': 'crystal-H',
  'I': 'crystal-I',
  'J': 'crystal-J',
  'K': 'crystal-K',
  'L': 'crystal-L',
  'M': 'crystal-M'
}
const bond_kind = {
  'a': 'bond-top',
  'b': 'bond-top-right',
  'c': 'bond-right',
  'd': 'bond-bottom-right',
  'e': 'bond-bottom',
  'f': 'bond-bottom-left',
  'g': 'bond-left',
  'h': 'bond-top-left',
  'A': 'bond-top-double',
  'B': 'bond-right-double',
  'C': 'bond-bottom-double',
  'D': 'bond-left-double',
  'E': 'bond-top-triple',
  'F': 'bond-right-triple',
  'G': 'bond-bottom-triple',
  'H': 'bond-left-triple',
  '1': 'bond-top-left-double',
  '2': 'bond-top-right-double',
  '3': 'bond-bottom-right-double',
  '4': 'bond-bottom-left-double'
}
// given an atom-spec return a list of image names in increasing z-index order
function atomSpecToImageNames (spec) {
  let bonds = spec[1]
  bonds = bonds ? bonds.split('') : []
  for (let i = 0; i < bonds.length; i++) {
    bonds[i] = bond_kind[bonds[i]]
  }
  bonds.push(atom_kind[spec[0]])
  return bonds
}
module.exports = atomSpecToImageNames
