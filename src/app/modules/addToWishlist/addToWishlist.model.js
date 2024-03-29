const mongoose = require('mongoose');

// Schema Design
const addToWishlistSchema = mongoose.Schema({
  title: {
    type: String,
    // required: [true, "Please provide a blog title"],
    minLength: [3, 'title must be at list 3 characters'],
    maxLength: [100, 'Name is too learge'],
  },
  img: {
    type: String,
    required: [true, 'Forum image is required'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a forum category'],
    enum: {
      values: categoryValues,
      message: 'Invalid category',
    },
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for property owners
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blogs', // Assuming you have a User model for property owners
    required: true,
  },
  description: [
    {
      title: String,
      content1: String,
      content2: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const addToWishlist = mongoose.model('AddToWishlist', addToWishlistSchema);
module.exports = addToWishlist;
