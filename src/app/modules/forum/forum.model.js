const mongoose = require('mongoose');
// const validator = require('validator');
const { categoryValues } = require('./forum.constant');

const forumSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a blog title'],
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
    description: [
      {
        title: String,
        content1: String,
        content2: String,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model for property owners
      required: true,
    },
    userActivities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'forum-User-Activities',
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
  },
  {
    timestamps: true,
  },
);

const Forum = mongoose.model('Blogs', forumSchema);

module.exports = Forum;
