const bcrypt = require('bcryptjs');
const { createAccessToken, createRefreshToken } = require('@/handlers/generateToken');
const PasswordModel = require('@/models/Password')

const authUser = async (req, res, { user, password }) => {
  const databasePassword = await PasswordModel.findOne({ user: user._id, removed: false });
  const { remember } = req.body
  const isMatch = await bcrypt.compare(databasePassword.salt + password, databasePassword.password);

  if (!isMatch)
    return res.status(403).json({
      success: false,
      result: null,
      message: 'Invalid credentials.',
    });

  if (isMatch === true) {
    const access_token = createAccessToken(remember, { id: user._id })
    const refresh_token = createRefreshToken({ id: user._id })

    await PasswordModel.findOneAndUpdate(
      { user: user._id },
      { $push: { loggedSessions: refresh_token } },
      {
        new: true,
      }
    ).exec();

    res
      .status(200)
      .cookie('refreshToken', refresh_token, {
        maxAge: req.body.remember ? 7 * 24 * 60 * 60 * 1000 : null,
        sameSite: 'Lax',
        httpOnly: true,
        secure: false,
        domain: req.hostname,
        path: '/',
        Partitioned: true,
      })
      .json({
        success: true,
        result: {
          access_token,
          user: {
            ...user._doc
          }
        },
        message: 'Successfully login user',
      });
  } else {
    return res.status(403).json({
      success: false,
      result: null,
      message: 'Invalid credentials.',
    });
  }
};

module.exports = authUser;
