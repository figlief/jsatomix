'use strict'
var test = require('tape')
var solutions = require('../').solutions.all

test('solutions-litmus', function (t) {
  t.plan(1)
  t.equal(
    solutions[2].uid,
    'esUZCA5K'
  )
})
