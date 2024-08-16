const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const { useAppSettings } = require('@/settings');
const checkAndCorrectURL = require('./checkAndCorrectURL');

const authUser = require('./authUser');
const shortid = require('shortid');

const UserModel = require('@/models/User')
const PasswordModel = require('@/models/Password')

const register = async (req, res, { userModel }) => {
    const { name, email, password } = req.body;
    // validate
    const objectSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .required(),
        password: Joi.string().required(),
    });

    const { error, value } = objectSchema.validate({ email, password });
    if (error) {
        return res.status(409).json({
            success: false,
            result: null,
            error: error,
            message: 'Invalid/Missing credentials.',
            errorMessage: error.message,
        });
    }

    const user = await UserModel.findOne({ email: email, removed: false });
    if (user) {
        return res.status(404).json({
            success: false,
            result: null,
            message: 'This email has been registered.',
        });
    } else {
        const pwinstance = new PasswordModel()
        const salt = 'some_salt';
        const password1 = 'some_password';
        console.log(pwinstance.generateHash(salt, password1));
        return res.status(200).json({
            success: true,
            result: null,
        });
        // const settings = useAppSettings();
        // const admin_email = settings['admin_email'];
        // const base_url = settings['base_url'];

        // const url = checkAndCorrectURL(base_url);

        // const link = url + '/verify/' + user._id + '/' + databasePassword.emailToken;

        // await sendMail({
        //     email,
        //     name: user.name,
        //     link,
        //     admin_email,
        //     emailToken: databasePassword.emailToken,
        // });
    }
};

module.exports = register;
