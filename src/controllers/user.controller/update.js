const catchAsync = require('../../utils/catchAsync');
const { userService } = require('../../services');

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

module.exports = {
  updateUser,
};
