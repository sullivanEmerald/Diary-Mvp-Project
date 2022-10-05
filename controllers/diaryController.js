const Diary = require('../model/Diary')
const Comment = require('../model/comment')

module.exports = {
    getProfile : async (req, res) => {
       try {
        const userDiary = await Diary.find({userId : req.user.id})
        const diaryCount = await Diary.countDocuments({userId : req.user.id, completed : false})
        res.render('profile.ejs', { userDiary :userDiary, user :req.user,  title : "PROFILE"})
        
       } catch (error) {
        console.error(error)
       }
    },

    renderDiaryForm : async (req, res) => {
        try {
            res.render('diaryForm.ejs', { user : req.user,  title : "Create Diary"})
        } catch (error) {
            console.error(error)
        }
    },

    createDiary : async (req, res) => {
        try {
            await Diary.create({
                title: req.body.title,
                snippet : req.body.snippet,
                body : req.body.event,
                action : req.body.action,
                likes: 0,
                userId: req.user.id,
                imageId : req.user.image,
                completed: false,
            })
            console.log('Diary Added to the database')
            res.redirect('/profile')
        } catch (error) {
            console.error
        }
    },

    getOneDiary : async (req, res) => {
        try {
            const oneDiary = await Diary.findById(req.params.id)
            const comment =  await Comment.find({ postId : req.params.id}).sort({ createdAt : "desc"}).lean()
            res.render('diary.ejs', { oneDiary : oneDiary, title : oneDiary.title, user : req.user, comment : comment,})
        } catch (error) {
            console.error(error)
        }
    },

    deleteDiary :async (req, res) => {
        try {
            await Diary.findOneAndDelete({ _id : req.params.id})
           console.log('deleted')
           res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }, 

    editDiary : async (req, res) => {
        console.log(req.params.id)
        try {
            await Diary.findOneAndUpdate({ _id : req.params.id}, {
                completed : true
            })
            console.log('Editing Done')
            res.redirect('/profile')
        } catch (error) {
            console.error(error)
        }
    },
    ReverseEditDiary : async (req, res) => {
        try {
            await Diary.findOneAndUpdate({ _id : req.params.id}, {
                completed : false
            })
            console.log('Editing Done')
            res.redirect('/profile')
        } catch (error) {
            console.error(error)
        }
    },


    addLike : async (req, res) => {
        try {
            await Diary.findOneAndUpdate({ _id : req.params.id }, {
                $inc : {
                    likes : 1
                }
            })
            console.log('likes have been updated')
            res.redirect('/diary/'+req.params.id)
        } catch (error) {
            console.error(error)
        }
    },


    viewProfile : async (req, res) => {
        try {
            const singleUserDiary = await Diary.find({ _id : req.params.id })
            console.log(singleUserDiary)
            res.render('userDiaries.ejs', { title : 'jesus', singleUserDiary : singleUserDiary})
        } catch (error) {
           console.error(error) 
        }
    },

    editDiaryBody :  async (req, res) => {
        try {
            const editDiary = await Diary.findById(req.params.id)
            res.render('editPost.ejs', { title : "Edit Diary", editDiary: editDiary, user : req.user})
        } catch (error) {
            console.error(error)
        }
    },

    updateDiary : async (req, res) => {
        try {
            await Diary.findOneAndUpdate({ _id : req.params.id}, {
                title: req.body.title,
                snippet : req.body.snippet,
                body : req.body.event,
                action : req.body.action,
            })
            console.log('Diary have been updated')
            res.redirect('/profile')
        } catch (error) {
            console.error(error)
        }
    },


    getUserDiary: async (req, res) => {
        try {
            const userDiary =  await Diary.findById(req.params.id)
            res.render('userDiary.ejs', { userDiary : userDiary, title : userDiary.title, user : req.user})

        } catch (error) {
            console.error(error)
        }
    }
 }