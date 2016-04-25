var test = require('tape')
var names = require('../lib/imagenames.js')

test('litmus', function (t) {
  t.plan(2)
  t.looseEqual(
    names(['1', '']),
    ['atom-h']
  )
  t.looseEqual(
    names(['1', 'gc']),
    ['bond-left', 'bond-right', 'atom-h']
  )
})
