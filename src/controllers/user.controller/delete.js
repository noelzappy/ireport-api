const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { userService } = require('../../services');

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  deleteUser,
};
