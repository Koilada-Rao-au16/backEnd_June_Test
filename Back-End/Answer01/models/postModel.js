const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  userId: {
    type: Number,
    default: 1
  },
  id: {
    type: Number,
    default: 0,
  },
  title:{
    type: String,
    unique: true,
    trim: true,
  },
  body:{
    type: String,
    unique: true,
    trim: true,
  }
});

postSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;