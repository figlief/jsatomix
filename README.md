# jsatomix

Status: not ready yet, totally unstable!

Tools for analyzing katomic/atomix type puzzels in node.js and playing them in a browser.

## levelsets

levelsets gives access to levelsets as imported from jsatomix-levelsets but with extra data.

extra data is:
    level.endpoints
    level.order
    level.levelsetName

## imagenames

given an atom-spec return a list of image names in increasing z-index order that are required to create a visual representation of an atom.

## endpoints

Given a level object, endpoints finds places in the arena where there is space  to build a molecule.  

Although there may be space for a molecule at a certail postion, it is not gaurenteed that it is actually possible to do so.


