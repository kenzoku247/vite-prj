const express = require('express');

const router = express.Router();

const { catchErrors } = require('@/handlers/errorHandlers');
const userAuth = require('@/controllers/authCtrl');

router.route('/login').post(catchErrors(userAuth.login));
router.route('/register').post(catchErrors(userAuth.register));
router.route('/activateUser').post(catchErrors(userAuth.activateUser));
router.route('/refreshToken').post(catchErrors(userAuth.refreshToken));

router.route('/forgetPassword').post(catchErrors(userAuth.forgetPassword));
router.route('/resetPassword').post(catchErrors(userAuth.resetPassword));

router.route('/logout').post(userAuth.isValidAuthToken, catchErrors(userAuth.logout));

module.exports = router;