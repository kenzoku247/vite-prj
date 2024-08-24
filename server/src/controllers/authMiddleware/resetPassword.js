const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const UserModel = require('@/models/User')
const PasswordModel = require('@/models/Password')
const { createAccessToken, createRefreshToken } = require('@/handlers/generateToken');

const shortid = require('shortid');

const resetPassword = async (req, res, { userModel }) => {
  const { password, userId, resetToken } = req.body;

  const user = await UserModel.findOne({ _id: userId, removed: false }).exec();
  const databasePassword = await PasswordModel.findOne({ user: userId, removed: false });

  if (!user.enabled) {
    return res.status(409).json({
      success: false,
      result: null,
      message: 'Your account is disabled, contact your account administrator',
    });
  }

  const isMatch = resetToken === databasePassword.resetToken;
  if (!isMatch || databasePassword.resetToken === undefined || databasePassword.resetToken === null)
    return res.status(403).json({
      success: false,
      result: null,
      message: 'Invalid reset token',
    });

  // validate
  const objectSchema = Joi.object({
    password: Joi.string().required(),
    userId: Joi.string().required(),
    resetToken: Joi.string().required(),
  });

  const { error, value } = objectSchema.validate({ password, userId, resetToken });
  if (error) {
    return res.status(409).json({
      success: false,
      result: null,
      error: error,
      message: 'Invalid reset password object',
      errorMessage: error.message,
    });
  }

  const pwInstance = new PasswordModel()
  const salt = shortid.generate();
  const hashedPassword = pwInstance.generateHash(salt, password);

  const access_token = createAccessToken(null, { id: user._id })
  const refresh_token = createRefreshToken({ id: user._id })

  await PasswordModel.findOneAndUpdate(
    { user: userId },
    {
      $push: { loggedSessions: refresh_token },
      password: hashedPassword,
      salt: salt,
      resetToken: shortid.generate(),
      emailVerified: true,
    },
    {
      new: true,
    }
  ).exec();

  return res
    .status(200)
    .cookie('refreshToken', refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
        },
      },
      message: 'Successfully reset password user',
    });
};

module.exports = resetPassword;
