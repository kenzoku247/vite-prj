const mongoose = require('mongoose');

const logout = async (req, res, { userModel }) => {
  const Password = mongoose.model('Password');

  const token = req.cookies.token;
  await Password.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { loggedSessions: token } },
    {
      new: true,
    }
  ).exec();

  res
    .clearCookie('token', {
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
