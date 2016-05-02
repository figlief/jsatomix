'use strict'
/**
Task: solution_endpoint
Status: In Progress

Given a solution object, find the endpoint for that soluion.
*/

const app = require('../')
const gameObject = require('../lib/gameObject.js')
const chunk = require('chunk')

function getEndpoint (s) {
  let h = Array.from(
    s.history,
    (v) => v.charCodeAt(0) - 97
  )
  let level = app.levelsets.get(s.levelSet, s.level)

  let a = gameObject(level)
  for (let move of chunk(h, 4)) {
    if (a.move(move) < 1) {
      throw new Error('bad history')
    }
  }
  console.log(a.toString())
  let arena = a.toString().join('')
  let mol = level.molecule
  let pad = '.'.repeat(a.width - mol[0].length)
  mol = mol.join(pad)
  let ep = arena.search(mol)
  if (ep < 0) return ''
  ep = String.fromCodePoint(
    97 + Math.floor(ep / a.width),
    97 + ep % a.width
  )
  console.log(ep)
  return a.toString()
}

module.exports = getEndpoint

