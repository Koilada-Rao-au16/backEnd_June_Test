const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

    text : {
        type : string
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})


const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = CommentModel