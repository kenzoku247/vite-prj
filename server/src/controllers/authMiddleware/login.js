const Joi = require('joi');
const authUser = require('./authUser');
const UserModel = require('@/models/User')

const login = async (req, res, { userModel }) => {
  console.log(req.body)
  const { username, password } = req.body;

  // validate
  const objectSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error, value } = objectSchema.validate({ username, password });
  if (error) {
    return res.status(409).json({
      success: false,
      result: null,
      error: error,
      message: 'Invalid/Missing credentials.',
      errorMessage: error.message,
    });
  }

  const user = await UserModel.findOne({ username: username, removed: false });

  // console.log(user);
  if (!user)
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No account with this username has been registered.',
    });

  if (!user.enabled)
    return res.status(409).json({
      success: false,
      result: null,
      message: 'Your account is disabled, contact your account administrator',
    });

  //  authUser if your has correct password
  authUser(req, res, { user, password });
};

module.exports = login;
