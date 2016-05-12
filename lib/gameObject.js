'use strict'
/**
## gameObject

A `gameObject` is an object representing a playable game.

It has a method `move()` which accepts a string representing a list of moves in the `history` format.

The moves are applied to the current state of the game to produce a new state.

The current state can be interrogated with the following methods.

- `endpoint()` returns the endpoint if the game has reached an endpoint or an empty string otherwise.

- `toString()` returns a string representing the current state of the arena.

An instance of `gameObject` can be created in one of two ways: from a `level` object or from a `solution` object.

```js
const jsa = require('jsatomix')

const level = jsa.levelsets.get('katomic', '1')
const gameFromLevel = jsa.gameObject.from(level)

const solution = jsa.solutions.all[0]
const gameFromSolution = jsa.gameObject.from(solution)
```
If a solution object is fed to the constructor, then the solutions `levelSet` and `level` properties are used to obtain a `level` object and the contents of the `history` property is fed to the game objects `move()` method.

Only those three properties are required so to initialise an object for a particular level do this:
```js
const jsa = require('jsatomix')
const game = jsa.gameObject.from({
  levelSet: 'katomic',
  level: '1',
  history: ''
})
// ###########
// #..#......#
// #.3#......#
// #.##......#
// #.#..#.####
// #....#.2..#
// ###.#.....#
// #1....#...#
// ###########

```
*/

const levelsets = require('./levelsets')
const chunk = require('chunk')
/**
 * gamePrototype
 *
 */
const gamePrototype = {
  /**
   * `move` apply a move to the current state of the game.
   *
   */
  move: function (moves) {
    moves = Array.from(
       moves,
      (v) => v.charCodeAt(0) - 97
    )
    let pos
    while (moves.length >= 4) {
      let [sr, sc, er, ec, ...rest] = moves
      moves = rest
      let start = sr * this.width + sc
      let end = er * this.width + ec
      do {
        if (sr < er) {
          pos = this.down(start)
          break
        }
        if (sr > er) {
          pos = this.up(start)
          break
        }
        if (sc < ec) {
          pos = this.right(start)
          break
        }
        if (sc > ec) {
          pos = this.left(start)
          break
        }
      } while (false)

      if (!pos || pos !== end) {
        return 0 // illegal move
      }
    }
    return pos
  },
  /** doMove applies a move to atom
   * at 'start' using offset provided by
   * 'dir'
   */
  doMove: function (start, dir) {
    const arena = this.arena
    const atom = arena[start]
    let pos = start
    if (atom < 1) return 0
    while (arena[pos + dir] < 0) {
      pos += dir
    }
    if (pos === start) return 0
    arena[start] = arena[pos]
    arena[pos] = atom
    return pos
  },
  /**
   * 'left' moves an atom at 'pos' left
   * as far as it will go.
   */
  left: function (pos) {
    return this.doMove(pos, -1)
  },
  /**
   * 'right' moves an atom at 'pos' right
   * as far as it will go.
   */
  right: function (pos) {
    return this.doMove(pos, 1)
  },
  /**
   * 'up' moves an atom at 'pos' up
   * as far as it will go.
   */
  up: function (pos) {
    return this.doMove(pos, -this.width)
  },
  /**
   * 'down' moves an atom at 'pos' down
   * as far as it will go.
   */
  down: function (pos) {
    return this.doMove(pos, this.width)
  },
  endpoint: function () {
    let ep = this.toString()
    ep = ep.search(this.reMol)
    if (ep < 0) return ''
    return String.fromCodePoint(
      97 + Math.floor(ep / this.width),
      97 + ep % this.width
    )
  },
  /**
   * `toString()` returns a  string representing the current state of the games aren.a.
   */
  toString: function () {
    let arena = this.arena
    let hash = '#'.codePointAt(0)
    let empty = '.'.codePointAt(0)
    let a = Array.from(
      arena,
      (c) => {
        if (c > 0) return c
        if (c === 0) return hash
        return empty
      }
    )
    a = String.fromCodePoint(...a)
    a = chunk(a, this.width).join('\n')
    return a
  }
}

function atomSort (atoms) {
  return atoms.sort((a, b) => {
    let dif = a[0] - b[0]
    if (dif !== 0) return dif
    return a[1] - b[1]
  })
}

function fromLevel (level) {
  /** gameObject constructor converts a game level into a playable game.
  */
  let atoms = []
  let a = level.arena
  let idx = -1
  let aa = Array.from(
    a.join(''),
    (c) => {
      idx += 1
      switch (c) {
        case '#': return 0
        case '.': return -1
        default:
          let atom = c.codePointAt(0)
          atoms.push([atom, idx])
          return atom
      }
    }
  )
  let mol = level.molecule
  let pad = '.'.repeat(a.width - mol[0].length)
  mol = mol.join(pad)

  let game = {
    __proto__: gamePrototype
  }
  Object.assign(game, {
    width: a[0].length,
    height: a.length,
    arena: aa,
    reMol: mol,
    atoms: atomSort(atoms)
  })
  return game
}

function fromSolution (s) {
  let {levelSet, level} = s
  let game = fromLevel(levelsets.get(levelSet, level))
  game.move(s.history)
  return game
}

function from (o) {
  if ('history' in o) {
    return fromSolution(o)
  }
  return fromLevel(o)
}
module.exports = {
  from
}
