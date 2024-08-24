const jwt = require('jsonwebtoken');

const UserModel = require('@/models/User')
const PasswordModel = require('@/models/Password');
const { createAccessToken, createRefreshToken } = require('@/handlers/generateToken');

const activateUser = async (req, res, { userModel }) => {
    const { activation_token } = req.body
    const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
    const {
        firstName, lastName, fullName, username, email, password, gender, salt
    } = user
    const checkEmail = await UserModel.findOne({ email: email })
    if (checkEmail) {
        return res.status(403).json({
            success: false,
            result: null,
            message: "This email already exists."
        })
    }
    const newUser = new UserModel({
        firstName, lastName, fullName, username, email, gender, enabled: true
    })
    await newUser.save()
    const newPassword = new PasswordModel({
        user: newUser._id, password, salt, emailVerified: true
    })
    await newPassword.save()
    const access_token = createAccessToken(null, { id: newUser._id })
    const refresh_token = createRefreshToken({ id: newUser._id })

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
                    ...newUser._doc
                },
            },
            message: 'Your account has been activated!',
        })
};

module.exports = activateUser;
