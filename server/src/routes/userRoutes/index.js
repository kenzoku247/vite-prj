const express = require('express');

const { catchErrors } = require('@/handlers/errorHandlers');

const router = express.Router();

const userController = require('@/controllers/userCtrl');

const { LocalSingleStorage } = require('@/middlewares/uploadMiddleware');
const authCtrl = require('@/controllers/authCtrl');

// router.route('/user/read/:id').get(catchErrors(userController.read));
router.get('/user/read/:id', authCtrl.isValidAuthToken, userController.read)

// router.route('/user/password-update/:id').patch(catchErrors(userController.updatePassword));
router.patch('/user/password-update/:id', authCtrl.isValidAuthToken, catchErrors(userController.updatePassword));

// router.route('/user/profile/password').patch(catchErrors(userController.updateProfilePassword));
router.patch('/user/profile/password', authCtrl.isValidAuthToken, catchErrors(userController.updateProfilePassword));

// router
//     .route('/user/profile/update')
//     .patch(
//         LocalSingleStorage({ entity: 'user', fieldName: 'photo', fileType: 'image' }),
//         catchErrors(userController.updateProfile)
//     );
router.patch('/user/profile/update', authCtrl.isValidAuthToken, LocalSingleStorage({ entity: 'user', fieldName: 'photo', fileType: 'image' }),
catchErrors(userController.updateProfile))

module.exports = router;