'use strict'
/**
gameObject
*/

const chunk = require('chunk')

const arenaPrototype = {
  move: function (move) {
    let [sr, sc, er, ec] = move
    let start = sr * this.width + sc
    let end = er * this.width + ec
    let pos
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
      return 0
    }
    return pos
  },
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
  left: function (pos) {
    return this.doMove(pos, -1)
  },
  right: function (pos) {
    return this.doMove(pos, 1)
  },
  up: function (pos) {
    return this.doMove(pos, -this.width)
  },
  down: function (pos) {
    return this.doMove(pos, this.width)
  },
  toString: function (pos) {
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
    return chunk(a, this.width)
  }
}

function atomSort (atoms) {
  return atoms.sort((a, b) => {
    let dif = a[0] - b[0]
    if (dif !== 0) return dif
    return a[1] - b[1]
  })
}

function gameObject (level) {
  /** Convert an arena from 'levelsets' format to an an object.
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
  let o = Object.create(arenaPrototype)
  Object.assign(o, {
    width: a[0].length,
    height: a.length,
    arena: aa,
    atoms: atomSort(atoms)
  })
  return o
}

module.exports = gameObject
