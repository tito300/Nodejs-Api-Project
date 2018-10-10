const UserService = require('./userService');
const userModel = require('../userModel');

const userService = new UserService(userModel);

module.exports = {
  userService,
};
