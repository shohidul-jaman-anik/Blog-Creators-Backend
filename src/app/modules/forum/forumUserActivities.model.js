
const mongoose = require("mongoose");
// const validator = require("validator");


const forumUserActivitiesSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Please provide a comment'],
      minLength: [3, 'Comment must be at list 3 characters'],
      maxLength: [200, 'Comment is too learge'],
    },
    userActivities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum',
      },
    ],
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const UserForumActivities = mongoose.model("forum-User-Activities", forumUserActivitiesSchema);


module.exports = UserForumActivities;