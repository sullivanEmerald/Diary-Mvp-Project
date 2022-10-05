const Diary = require('../model/Diary')

module.exports = {
    getFeed:  async (req, res) => {
       try {
            const diaryBlog =  await Diary.find({ completed : true })
            res.render('feed.ejs', { blog : diaryBlog, user : req.user, title : " Diary Blog"})
        } catch (error) {
            console.error(error)
        }
    }, 

    getIndex :  async (req, res) => {
        try {
            res.render('index.ejs', { title : 'Home Page'})
        } catch (error) {
            console.error(error)
        }
    }
}
