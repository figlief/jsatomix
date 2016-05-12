'use strict'
/**
## endpoints
`endpoints` is a module used to find space in an arena where the molecule will fit.

Note: Just because a molecule can fit does not mean it is possible to build it there.

The input is a game level from levesets and the output is a list of strings representing potential endpoints.

### TODO:
This is a crude algorithm. Improve it by
- blocking off areas no atom can reach.
- making sure all atoms can reach their allotted spot in a potential endpoint.

###example:
```js
const jsa = require('jsatomix')
const level = jsa.levelsets.get("katomic", "1")
console.log(jsa.endpoints(level))

// ['be', 'bf', 'bg', 'bh', 'ce', 'cf', 'cg', 'ch', 'de', 'df', 'dg', 'dh', 'fb', 'fc', 'fg', 'fh', 'gf', 'gg', 'gh', 'hb', 'hc', 'hd', 'hh']
```

*/

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
