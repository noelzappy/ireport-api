const create = require('./create');
const remove = require('./delete');
const update = require('./update');
const get = require('./get');

module.exports = {
  ...create,
  ...remove,
  ...update,
  ...get,
};
