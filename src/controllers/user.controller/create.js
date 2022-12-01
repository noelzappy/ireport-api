const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { userService } = require('../../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createUser,
};
