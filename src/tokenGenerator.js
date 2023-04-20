const token = require('crypto');

function generatesToken() {
  return token.randomBytes(8).toString('hex');
}

module.exports = generatesToken;
