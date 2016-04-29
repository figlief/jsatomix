'use strict'
var test = require('tape')
var levelsets = require('../lib/levelsets.js')

test('levelsets-litmus', function (t) {
  t.plan(1)
  t.looseEqual(
    levelsets.get('mystery', '5').name,
    'Adrien 5'
  )
})
