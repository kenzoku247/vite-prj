const Joi = require('joi');
const UserModel = require('@/models/User')
const PasswordModel = require('@/models/Password')
const checkAndCorrectURL = require('./checkAndCorrectURL');
const sendMail = require('./sendMail');
const shortid = require('shortid');

const { useAppSettings } = require('@/settings');

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  // validate
  const objectSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required(),
  });

  const { error, value } = objectSchema.validate({ email });
  if (error) {
    return res.status(409).json({
      success: false,
      result: null,
      error: error,
      message: 'Invalid email.',
      errorMessage: error.message,
    });
  }

  const user = await UserModel.findOne({ email: email, removed: false });
  // const databasePassword = await Password.findOne({ user: user._id, removed: false });

  if (!user.enabled)
    return res.status(409).json({
      success: false,
      result: null,
      message: 'Your account is disabled, contact your account Administrator',
    });

  if (!user)
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No account with this email has been registered.',
    });

  const resetToken = shortid.generate();
  await PasswordModel.findOneAndUpdate(
    { user: user._id },
    { resetToken },
    {
      new: true,
    }
  ).exec();

  const settings = useAppSettings();
  const admin_email = settings['admin_email'];
  const base_url = settings['base_url'];

  const url = checkAndCorrectURL(base_url);

  const link = url + '/resetPassword/' + user._id + '/' + resetToken;

  await sendMail({
    email,
    name: user.name,
    link,
    subject: 'Reset Your Password',
    admin_email,
    type: 'passwordVerification',
  });

  return res.status(200).json({
    success: true,
    result: null,
    message: 'Check your email inbox to reset your password',
  });
};

module.exports = forgetPassword;
