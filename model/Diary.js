const mongoose = require('mongoose')


const diarySchema = new mongoose.Schema({
     title : {
        type: String,
        require : true,
     },

     snippet : {
        type: String,
        require : true,
     },

     body : {
        type: String,
        require : true,
     },

     action : {
      type: String,
      require : true,
   },

   likes: {
      type: Number,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    imageId : {
      type : String,
      ref: "User",
    },

    completed : {
      type : Boolean,
      require: true,
    },

     date : {
        type: Date,
        default : Date.now,
    },


})

module.exports =  mongoose.model('Diary', diarySchema)