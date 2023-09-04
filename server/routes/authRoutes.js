const { Router } = require('express')
const { userRegisterController, userLoginController, emailVerificationController, sendVerificationController } = require('../controller/authController')
const router = Router();

router.post('/register', userRegisterController);
router.post('/login', userLoginController);
router.get('/verify/:token', emailVerificationController)
router.post('/send-verification-email', sendVerificationController)

module.exports = router;