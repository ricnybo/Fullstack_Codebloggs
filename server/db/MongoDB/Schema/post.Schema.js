// post.Schema.js is the schema for the post model.
// location:  /server/db/MongoDB/Schema/post.Schema.js

// Here's a brief explanation of your schema:

// content: A string that is required and will be trimmed automatically by Mongoose.
// User: An ObjectId that references the User model.This is required.
// likes: A number that is required.
// time_stamp: A string that is required and will be trimmed automatically by Mongoose.
// comments: An array of ObjectIds that reference the Comment model.
// timestamps: An option that, when set to true, tells Mongoose to automatically manage createdAt and updatedAt fields for each record.

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    time_stamp: {
      type: String,
      trim: true,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// Log any errors that occur while creating indexes for the User schema
PostSchema.on("index", function (error) {
  console.log(error); // If there's an error, it will log it
});

export default mongoose.model("Post", PostSchema);
