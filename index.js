var l = require('jsatomix-levelsets')
var _ = require('lodash')

_.forOwn(l, function (v, k) {
  console.log(k, v.levels.length)
})
