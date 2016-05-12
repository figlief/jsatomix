'use strict'

const fs = require('fs')
// const jsa = require('../')

function getNote (name) {
  let txt = fs.readFileSync(name)
  if (name.endsWith('.js')) {
    let s = txt.indexOf('/**\n') + 4
    let e = txt.indexOf('\n*/')
    txt = txt.slice(s, e)
  }
  return txt.toString()
}

function gather (name) {
  return getNote(name).replace(
    /@insert[ \t]+([^ \n]*)/g,
    ($0, $1) => gather($1)
  )
}

fs.writeFileSync(
  'README.md',
  gather('index.js')
)

