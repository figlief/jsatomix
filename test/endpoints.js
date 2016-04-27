'use strict'
var test = require('tape')
var endpoints = require('../lib/endpoints.js')

let level1 = {
  'arena': [
    '###########',
    '#..#......#',
    '#.3#......#',
    '#.##......#',
    '#.#..#.####',
    '#....#.2..#',
    '###.#.....#',
    '#1....#...#',
    '###########'
  ],
  'molecule': [
    '123'
  ]
}

test('endpoints-litmus', function (t) {
  t.plan(1)
  t.looseEqual(
    endpoints(level1),
    ['be', 'bf', 'bg', 'bh', 'ce', 'cf', 'cg', 'ch', 'de', 'df', 'dg', 'dh', 'fb', 'fc', 'fg', 'fh', 'gf', 'gg', 'gh', 'hb', 'hc', 'hd', 'hh']
  )
})
