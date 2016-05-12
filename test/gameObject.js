'use strict'
const test = require('tape')
const jsa = require('../')

test('gameObject-litmus', function (t) {
  t.plan(1)

  const game = jsa.gameObject.from(
    jsa.solutions.all[1]
  )
  t.equal(game.toString(),
`###########
#..#...123#
#..#......#
#.##......#
#.#..#.####
#....#....#
###.#.....#
#.....#...#
###########`)
})
