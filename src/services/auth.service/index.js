const login = require('./login');
const logout = require('./logout');
const auth = require('./auth');

module.exports = {
  ...login,
  ...logout,
  ...auth,
};
