let levelsets = require('./lib/levelsets.js')

module.exports = {
  'levelsets': () => { return levelsets.get('') },
  'imagenames': require('./lib/imagenames'),
  'endpoints': require('./lib/endpoints')
}
