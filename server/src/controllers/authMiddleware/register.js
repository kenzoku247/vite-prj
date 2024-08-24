const Joi = require('joi');
const { useAppSettings } = require('@/settings');
const { createActivationToken } = require('@/handlers/generateToken');
const checkAndCorrectURL = require('./checkAndCorrectURL');
const sendMail = require('./sendMail');
const shortid = require('shortid');

const UserModel = require('@/models/User')
const PasswordModel = require('@/models/Password')

const register = async (req, res, { userModel }) => {
    const settings = useAppSettings();
    const admin_email = settings['admin_email'];
    const base_url = settings['base_url'];
    const url = checkAndCorrectURL(base_url);

    // Merge full name
    const { firstName, lastName, username, email, password, gender } = req.body;
    const newFullName = firstName + ' ' + lastName

    // Remove space from username
    let newUsername = username.toLowerCase().replace(/ /g, '')

    // Check if username is existed
    let checkedUsername = await UserModel.findOne({ username: newUsername });
    if (checkedUsername) {
        return res.status(403).json({
            success: false,
            result: null,
            message: 'This username already existed.',
        });
    } else {
        checkedUsername = newUsername
    }

    // Validate email and password
    const objectSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    const { error, value } = objectSchema.validate({ email, username, password });
    if (error) {
        return res.status(409).json({
            success: false,
            result: null,
            error: error,
            message: 'Invalid/Missing credentials.',
            errorMessage: error.message,
        });
    }

    // Check if email is existed
    const checkedEmail = await UserModel.findOne({ email });
    if (checkedEmail) {
        return res.status(403).json({
            success: false,
            result: null,
            message: "This email already exists."
        });
    }

    // Check if password is at least 6 characters
    if (password.length < 6) {
        return res.status(409).json({
            success: false,
            result: null,
            message: "Password must be at least 6 characters."
        })
    }
    const pwInstance = new PasswordModel()
    const salt = shortid.generate();
    const hashedPassword = pwInstance.generateHash(salt, password);
    const newUser = {
        firstName, lastName, fullName: newFullName, username: checkedUsername, email, password: hashedPassword, gender, salt
    }
    const activationToken = createActivationToken(newUser)
    const link = url + '/verify/' + activationToken;
    const sendEmail = async () => {
        const response = await sendMail({
            email: email,
            name: newFullName,
            link: link,
            subject: 'Verify Your Account',
            admin_email: admin_email,
            type: 'emailVerification',
        });
    }
    // sendEmail();
    return res.status(200).json({
        success: true,
        result: null,
        message: activationToken,
        // message: 'Check your email inbox to verify your account.',
    });
};

module.exports = register;
