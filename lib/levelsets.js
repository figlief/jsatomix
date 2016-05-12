'use strict'
/**
## levelsets

`levelsets` provides two functions and a property:
* `levelsets.get(levelsetName, levelid | index)`
  where `levelid` is a string and index is an integer. Currently index=0 is equivilent to levelid = "1" but that may change
* `levelsets.eachLevel(fn)` iterates over each level in  all levelsets and executes `fn(level)` where level is an object describing the level.
* `levelsets.all` returns an object keyed by levelset name containing all levelsets

`levelsets` gives access to levelsets as imported from jsatomix-levelsets but with extra properties.

extra data is:
* level.endpoints
* level.order
* level.levelsetName

### Example
```js
const jsa = require('jsatomix')
const lvls = jsa.levelsets
const level = lvls.get('katomic', '1')
console.log(level.name)
// Water
```

*/

const endpoints = require('./endpoints.js')
const all = require('jsatomix-levelsets')
const levelsetNames = Object.keys(all)

eachLevel((level, name, order) => {
  level.levelSetName = name
  level.endpoints = endpoints(level)
  level.order = order
})

function eachLevel (fn) {
  for (let name of levelsetNames) {
    let levels = all[name].levels
    let order = 0
    for (let level of levels) {
      fn(level, name, order)
      order += 1
    }
  }
}

function get (levelset, level) {
  if (Number.isInteger(level)) {
    return all[levelset].levels[level]
  }
  for (let o of all[levelset].levels) {
    if (level === o.id) {
      return o
    }
  }
}

module.exports = {
  all,
  eachLevel,
  get
}

