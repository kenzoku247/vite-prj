const jwt = require('jsonwebtoken');

exports.createAccessToken = (remember, payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: remember ? '30d' : '1d' })
};

exports.createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
};

exports.createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
};
