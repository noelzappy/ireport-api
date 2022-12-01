const auth = require('./auth');
const verification = require('./verification');

module.exports = {
  ...auth,
  ...verification,
};
