'use strict'
/**
## solutions

`solutions` provides access to solutions that have been collected from the kp-atomix project web site and are presented as objects.
```
const jsa = require('jsatomix'i
const solutions = jsa.solutions.all
console.log(solutions[99])
//{ uid: 'KCuHPdpg',
//  date: '2010-04-09 22:24:04',
//  levelSet: 'katomic',
//  level: '1',
//  user: 'Omar Anber',
//  history: 'fhfgfgggggbgbgbebefecccbcbfbfbfdhbhfhfgfgfgjgjfjfjfgfebebebjfdfefebebjbfbfdfbebjdfbfbfbifgbgbgbh' }
```

At the moment only `solutions` all is provided, but other properties and methods will be added.

Many of the solutions are long winded and with lots of backtracking. It would bean interesting exercise to examine all the solutions and eliminate the backtracking to produce a shorter solution.

*/
const all = require(
  'jsatomix-solutions')

module.exports = {
  all
}
