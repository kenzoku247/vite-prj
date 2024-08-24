const PasswordModel = require('@/models/Password');

const logout = async (req, res, { userModel }) => {

  const refresh_token = req.cookies.refreshToken;
  await PasswordModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { loggedSessions: refresh_token } },
    {
      new: true,
    }
  ).exec();

  res
    .clearCookie('refreshToken', {
      maxAge: null,
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      domain: req.hostname,
      Path: '/',
    })
    .json({
      success: true,
      result: {},
      message: 'Successfully logout',
    });
};

module.exports = logout;
