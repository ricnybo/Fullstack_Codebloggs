// comment.Schema.js is the schema for the Comment model.
// location:  /server/db/MongoDB/Schema/comment.Schema.js

// Here's a brief explanation of your schema:

// content: A string that is required and will be trimmed automatically by Mongoose.
// post_id: An ObjectId that references the Post model.This is required.
// User: An ObjectId that references the User model.This is required.
// likes: A number that is required.
// time_stamp: A string that is required and will be trimmed automatically by Mongoose.
// timestamps: An option that, when set to true, tells Mongoose to automatically manage createdAt and updatedAt fields for each record.

import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    time_stamp: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

// Log any errors that occur while creating indexes for the User schema
CommentSchema.on("index", function (error) {
  console.log(error); // If there's an error, it will log it
});

export default mongoose.model("Comment", CommentSchema);
