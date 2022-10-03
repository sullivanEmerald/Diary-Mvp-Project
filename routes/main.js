const express = require('express')
const router =  express.Router()
const homeController = require('../controllers/home')
const { ensureAuth  } =  require('../middleware/auth')
const authController =  require('../controllers/auth')
const diaryController = require('../controllers/diaryController')
const uplodad =  require('../middleware/multer')



// const postController =  require('../controllers/posts')


router.get('/',  homeController.getIndex)
router.get('/feed', ensureAuth, homeController.getFeed)
router.get('/profile', ensureAuth, diaryController.getProfile)
router.get('/profile/:id', diaryController.viewProfile )
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', uplodad.single('file'), authController.postSignup)

module.exports = router;