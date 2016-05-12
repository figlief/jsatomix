'use strict'
var test = require('tape')
var levelsets = require('../lib/levelsets.js')

test('levelsets-litmus', function (t) {
  t.plan(4)

  const level = levelsets.get('mystery', '5')
  t.equal(level.name, 'Adrien 5')
  t.equal(level.levelSetName, 'mystery')
  t.equal(level.order, 4)
  t.equal(
    levelsets.all['mystery'].levels[4].name,
    'Adrien 5'
  )
})
