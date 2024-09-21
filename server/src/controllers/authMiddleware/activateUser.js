const jwt = require('jsonwebtoken');

const UserModel = require('@/models/User')
const PasswordModel = require('@/models/Password');
const { createAccessToken, createRefreshToken } = require('@/handlers/generateToken');

const activateUser = async (req, res, { userModel }) => {
    const activation_token = Object.keys(req.body)[0]
    const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
    // console.log(user);
    const {
        firstName, lastName, fullName, username, email, password, gender, salt
    } = user
    const checkUser = await UserModel.findOne({ email: email })
    if (checkUser) {
        checkPassword = await PasswordModel.findOne({ user: checkUser._id })
        if (checkPassword.emailVerified){
            return res.status(403).json({
                success: false,
                result: null,
                message: "Your account has created successfully. Please login!"
            })
        }
        return res.status(403).json({
            success: false,
            result: null,
            message: "This email has already created. Please login!"
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
