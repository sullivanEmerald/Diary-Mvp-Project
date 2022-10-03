const express = require('express')
const router =  express.Router()

const diaryController =  require('../controllers/diaryController')

router.get('/', diaryController.getProfile)
router.get('/createDiary', diaryController.renderDiaryForm)
router.get('/:id', diaryController.getOneDiary)
router.post('/createDiary', diaryController.createDiary)
router.delete('/deleteDiary/:id', diaryController.deleteDiary)
router.put('/editPost/:id', diaryController.editDiary)
router.put('/reverseEdit/:id', diaryController.ReverseEditDiary)
router.put('/addLike/:id', diaryController.addLike)
router.get('/editDiary/:id', diaryController.editDiaryBody)
router.post('/createDiary/:id', diaryController.updateDiary)
router.get('/viewDiary/:id', diaryController.getUserDiary)


module.exports =  router