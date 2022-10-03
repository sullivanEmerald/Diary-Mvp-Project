const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment')


router.post('/createComment/:id', commentController.createComment)
router.put('/editLike/:id', commentController.addLikes)

module.exports =  router