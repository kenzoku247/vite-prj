const jwt = require('jsonwebtoken');

const UserModel = require('@/models/User')
const PasswordModel = require('@/models/Password');
const isValidAuthToken = async (req, res, next, { userModel, jwtSecret = 'REFRESH_TOKEN_SECRET' }) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token)
      return res.status(401).json({
        success: false,
        result: null,
        message: 'No authentication token, authorization denied.',
        jwtExpired: true,
      });

    const verified = jwt.verify(refresh_token, process.env[jwtSecret]);

    if (!verified)
      return res.status(401).json({
        success: false,
        result: null,
        message: 'Token verification failed, authorization denied.',
        jwtExpired: true,
      });

    const passwordPromise = PasswordModel.findOne({ user: verified.id, removed: false });
    const userPromise = UserModel.findOne({ _id: verified.id, removed: false });

    const [user, password] = await Promise.all([userPromise, passwordPromise]);

    if (!user)
      return res.status(401).json({
        success: false,
        result: null,
        message: "User does not exist, authorization denied.",
        jwtExpired: true,
      });

    const { loggedSessions } = password;
    if (!loggedSessions.includes(refresh_token))
      return res.status(401).json({
        success: false,
        result: null,
        message: 'User is already logout try to login, authorization denied.',
        jwtExpired: true,
      });
    else {
      const reqUserName = userModel.toLowerCase();
      req[reqUserName] = user;
      next();
    }
  } catch (error) {
    return res.status(503).json({
      success: false,
      result: null,
      message: error.message,
      error: error,
      controller: 'isValidAuthToken',
    });
  }
};

module.exports = isValidAuthToken;
