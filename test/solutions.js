'use strict'
var test = require('tape')
var solutions = require('../').solutions
test('solutions-litmus', function (t) {
  t.plan(1)
  t.equal(
    solutions.all[2].uid,
    'esUZCA5K'
  )
})

