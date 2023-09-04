const { Router } = require('express')
const { getUsersController, followUserController, unfollowUserController } = require('../controller/userController')
const requireSignIn = require('../middlewares/authMiddleware')
const router = Router();

router.get('/get-users', requireSignIn, getUsersController)
router.post('/follow', requireSignIn, followUserController)
router.post('/unfollow', requireSignIn, unfollowUserController)


module.exports = router;