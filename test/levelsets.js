'use strict'
var test = require('tape')
var levelsets = require('../lib/levelsets.js')

test('levelsets-litmus', function (t) {
  t.plan(2)
  t.equal(
    levelsets.get('mystery', '5').name,
    'Adrien 5'
  )
  t.equal(
    levelsets.all['mystery'].levels[4].name,
    'Adrien 5'
  )
})
