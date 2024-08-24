const jwt = require('jsonwebtoken');

const UserModel = require('@/models/User')
const { createAccessToken, createRefreshToken } = require('@/handlers/generateToken');

const refreshToken = async (req, res, { userModel }) => {
    const refresh_token = req.cookies.refreshToken
    if (!refresh_token) {
        return res.status(403).json({
            success: false,
            result: null,
            message: "Please login now."
        })
    }
    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
        if (err) {
            return res.status(403).json({
                success: false,
                result: null,
                message: "Please login now."
            })
        }

        const user = await UserModel.findById(result.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                result: null,
                message: "This user does not exist."
            })
        }

        const access_token = createAccessToken(null, { id: result.id })

        return res.status(200).json({
            success: true,
            result: {
                access_token,
                user
            },
            message: "Login success!"

        })
    })
};

module.exports = refreshToken;
