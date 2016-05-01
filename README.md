# jsatomix

Status: not ready yet, totally unstable!

Tools for analyzing katomic/atomix type puzzels in node.js and playing them in a browser.

## levelsets

levelsets provides two functions and a property:
* levelset.get(levelsetName, levelid|index)
  where levelid is a string and index is an integer. Currently index=0 is equivilent to levelid = "1" but that may change
* levelset.all returns an object keyed by levelset name containing all levelsets
* levelset.eachLevel(fn) iterates over each level in  all levelsets and executes fn(level) where level is an object describing the level.

levelsets gives access to levelsets as imported from jsatomix-levelsets but with extra data.

extra data is:
* level.endpoints
* level.order
* level.levelsetName

## imagenames

Given an atom-spec return a list of image names in increasing z-index order that are required to create a visual representation of an atom.

## endpoints

Given a level object, endpoints finds places in the arena where there is space  to build a molecule.  

Although there may be space for a molecule at a certain postion, it is not guaranteed that it is actually possible to build it there.

## solutions

These solutions have been collected from the kp-atomix project web site and are presented as objects.

Many of the solutions are long winded and with lots of backtracking. It would bean interesting exercise to examine all the solutions and eliminate the backtracking to produce a shorter solution. 
