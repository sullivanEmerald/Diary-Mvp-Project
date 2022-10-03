const mongoose = require('mongoose')


const  CommentSchema = new mongoose.Schema({ 
    comment : {
        type : String,
        required : true
    },

    postId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diary",
    },

      createdAt: {
        type: Date,
        default: Date.now,
    },
    likes : {
        type : Number,
        required :  true
    },

    commenterId : {
        type: String,
        required : true,
    }


})


module.exports = mongoose.model('Comment', CommentSchema)