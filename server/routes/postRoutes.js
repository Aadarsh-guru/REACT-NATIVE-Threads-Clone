const { Router } = require('express')
const { createPostController, likePostController, unlikePostController, getAllPostController } = require('../controller/postController')
const requireSignIn = require('../middlewares/authMiddleware')
const router = Router();

router.post('/create-post', requireSignIn, createPostController)
router.put('/like/:id', requireSignIn, likePostController)
router.put('unlike/:id', requireSignIn, unlikePostController)
router.get('/all-posts', requireSignIn, getAllPostController)


module.exports = router;