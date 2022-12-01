const httpStatus = require('http-status');
const Token = require('../../models/token.model');
const ApiError = require('../../utils/ApiError');
const { tokenTypes } = require('../../config/tokens');

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

module.exports = {
  logout,
};
