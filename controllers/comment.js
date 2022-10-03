
const Comment = require('../model/comment')

module.exports = {
    createComment : async (req, res) => {
        try {
            await Comment.create({
                comment : req.body.comment,
                postId : req.params.id,
                likes : 0,
                commenterId : req.user.image
            })
            console.log('comment added to the database')
            res.redirect('/diary/'+req.params.id)
        } catch (error) {
            console.error(error)
        }
    },

    addLikes : async (req, res) => {

        try {
           await Comment.findOneAndUpdate({ _id : req.params.id}, {
            $inc : { likes : 1}
           })
           console.log('likes successfulluy updated')
           res.redirect('/diary/'+req.params.id)
        } catch (error) {
            console.error(error)
        }
    }
}