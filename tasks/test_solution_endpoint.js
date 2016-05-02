const getEndpoint = require('./solution_endpoint.js')
const app = require('../')

const s1 = app.solutions[1]
console.log(getEndpoint(s1))

