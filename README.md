# jsatomix

Status: not ready yet, totally unstable!

Tools for analyzing katomic/atomix type puzzels in node.js and playing them on a command line and in a browser.

I am a part time hobby programer. This project is a vehicle for me to explore node.js and the new javascript.

Node v6 is required. babel and browserify will be used for browser code when I get around to that.

## levelsets

`levelsets` provides two functions and a property:
* `levelsets.get(levelsetName, levelid | index)`
  where `levelid` is a string and index is an integer. Currently index=0 is equivilent to levelid = "1" but that may change
* `levelset.eachLevel(fn)` iterates over each level in  all levelsets and executes `fn(level)` where level is an object describing the level.
* `levelset.all` returns an object keyed by levelset name containing all levelsets

levelsets gives access to levelsets as imported from jsatomix-levelsets but with extra data.

extra data is:
* level.endpoints
* level.order
* level.levelsetName

### Example
```
const jsa = require('jsatomix')
const lvls = jsa.levelsets
const level = lvls.get('katomic', '1')
console.log(level.name)
// Water
```

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


## imagenames

Given an atom-spec return a list of image names in increasing z-index order that are required to create a visual representation of an atom.
## endpoints
`endpoints` is a module used to find space in an arena where the molecule will fit.

Note: Just because a molecule can fit does not mean it is possible to build it there.

The input is a game level from levesets and the output is a list of strings representing potential endpoints.

### TODO:
This is a crude algorithm. Improve it by
- blocking off areas no atom can reach.
- making sure all atoms can reach their allotted spot in a potential endpoint.

###example:
```
const jsa = require('jsatomix')
const level = jsa.levelsets.get("katomic", "1")
console.log(jsa.endpoints(level))

// ['be', 'bf', 'bg', 'bh', 'ce', 'cf', 'cg', 'ch', 'de', 'df', 'dg', 'dh', 'fb', 'fc', 'fg', 'fh', 'gf', 'gg', 'gh', 'hb', 'hc', 'hd', 'hh']
```


## gameObject

A `gameObject` is an object representing a playable game.

It has a method `move()` which accepts a string representing a list of moves in the `history` format.

The moves are applied to the current state of the game to produce a new state.

The current state can be interrogated with the following methods.

- `endpoint()` returns the endpoint if the game has reached an endpoint or an empty string otherwise.

- `toString()` returns a strings representing the current state of the arena.

An instance of `gameObject can be created in one of two ways: from a `level` object or from a `solution` object.

```
const jsa = require('jsatomix')

const level = jsa.levelsets.get('katomic', '1')
const gameFromLevel = jsa.gameObject.from(level)

const solution = jsa.solutions.all[0]
const gameFromSolution = jsa.gameObject.from(solution)
```
If a solution object is fed to the constructor, then the solutions `levelSet` and `level` properties are used to obtain a `level` object and the contents of the `history` property is fed to the game objects `move` method.

Only those three properties are required so to initialise an object for a particular level do this:
```
const jsa = require('jsatomix')
const game = jsa.gameObject.from({
  levelSet: 'katomic',
  level: '1',
  history: ''
})
// ###########
// #..#......#
// #.3#......#
// #.##......#
// #.#..#.####
// #....#.2..#
// ###.#.....#
// #1....#...#
// ###########

```
