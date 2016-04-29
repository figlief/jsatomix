'use strict'

const endpoints = require('./endpoints.js')
let raw = require('jsatomix-levelsets')
let levelsetNames = Object.keys(raw)

eachLevel((level, order, name) => {
  level.levelset = name
  level.endpoints = endpoints(level)
  level.order = order
})

function eachLevel (fn) {
  for (let name of levelsetNames) {
    let levels = raw[name].levels
    let order = 0
    for (let level of levels) {
      fn(level, name, order)
      order += 1
    }
  }
}

function get (levelset, level) {
  if (Number.isInteger(level)) {
    return raw[levelset].levels[level]
  }
  for (let o of raw[levelset].levels) {
    if (level === o.id) {
      return o
    }
  }
}

module.exports = {
  all: raw,
  eachLevel: eachLevel,
  get: get
}

