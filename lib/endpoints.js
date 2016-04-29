/**
Endpoints is a module used to find space in an arena where the molecule will fit. just because a molecule can fit does not mean it is possible to build it there.

The input is a game level and the output is a list of strings representing endpoints.
*/

'use strict'

function endpoints (level, raw) {
  //
  let arena = level.arena
  let arenaWidth = arena[0].length
  arena = arena.join('')
  let arenaSize = arena.length
  arena = arena.replace(/[^#]/g, 'x')
  let mol = level.molecule
  let molWidth = mol[0].length
  let pad = Array(arenaWidth - molWidth + 1).join('.')
  mol = mol.join(pad)
  mol = mol.replace(/[^.]/g, 'x')

  let ep = []
  let done = arenaSize - mol.length
  let xpos = 0
  while (xpos < done) {
    let pos = arena.slice(xpos).search(mol)

    if (pos > -1) {
      xpos += pos
      ep.push(xpos)
    }
    xpos++
  }
  for (let i = 0; i < ep.length; i++) {
    let v = ep[i]
    let r = Math.floor(v / arenaWidth)
    let c = v % arenaWidth
    ep[i] = String.fromCodePoint(r + 97, c + 97)
  }
  return ep
}

module.exports = endpoints

