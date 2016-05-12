'use strict'
/**
Task: solution_endpoint
Status: In Progress

Given a solution object, find the endpoint for that soluion.
*/

const app = require('../')
const gameObject = require('../lib/gameObject.js')

function getEndpoint (s) {
  let level = app.levelsets.get(s.levelSet, s.level)

  let a = gameObject(level)
  a.move(s.history)
  console.log(a.toString())
  console.log('endpoint: ', a.endpoint())
  return a.toString()
}

module.exports = getEndpoint

