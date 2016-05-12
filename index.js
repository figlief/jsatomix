'use strict'
/**
# jsatomix

Status: not ready yet, totally unstable!

Tools for analyzing katomic/atomix type puzzels in node.js and playing them on a command line and in a browser.

I am a part time hobby programer. This project is a vehicle for me to explore node.js and the new javascript.

Node v6 is required. babel and browserify will be used for browser code when I get around to that.

@insert lib/levelsets.js
@insert lib/solutions.js

@insert lib/imagenames.js
@insert lib/endpoints.js

@insert lib/gameObject.js
*/
const levelsets = require(
  './lib/levelsets')
const imagenames = require(
  './lib/imagenames')
const endpoints = require(
  './lib/endpoints')
const solutions = require(
  './lib/solutions')
const gameObject = require(
  './lib/gameObject')

module.exports = {
  levelsets,
  imagenames,
  endpoints,
  solutions,
  gameObject
}
