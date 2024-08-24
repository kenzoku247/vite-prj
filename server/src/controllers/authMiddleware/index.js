const isValidAuthToken = require('./isValidAuthToken');
const login = require('./login');
const register = require('./register');
const activateUser = require('./activateUser');
const refreshToken = require('./refreshToken');
const logout = require('./logout');
const forgetPassword = require('./forgetPassword');
const resetPassword = require('./resetPassword');

const authMiddleware = (userModel) => {
  let authMethods = {};

  authMethods.isValidAuthToken = (req, res, next) =>
    isValidAuthToken(req, res, next, {
      userModel,
    });

  authMethods.login = (req, res) =>
    login(req, res, {
      userModel,
    });
  
  authMethods.register = (req, res) =>
    register(req, res, {
      userModel,
    });
  
  authMethods.activateUser = (req, res) =>
    activateUser(req, res, {
      userModel,
    });
  
  authMethods.refreshToken = (req, res) =>
    refreshToken(req, res, {
      userModel,
    });

  authMethods.forgetPassword = (req, res) =>
    forgetPassword(req, res, {
      userModel,
    });

  authMethods.resetPassword = (req, res) =>
    resetPassword(req, res, {
      userModel,
    });

  authMethods.logout = (req, res) =>
    logout(req, res, {
      userModel,
    });
  return authMethods;
};

module.exports = authMiddleware;
