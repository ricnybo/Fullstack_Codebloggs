// session.Schema.js is the schema for the Session model.
// location:  /server/db/MongoDB/Schema/session.Schema.js

// Here's a brief explanation of your schema:

// session_id: A string that is required and will be trimmed automatically by Mongoose.
// session_date: A date that is required.The trim option is not applicable to Date types and can be removed.
// User: An ObjectId that references the User model.This is required.The trim option is not applicable to ObjectId types and can be removed.
// timestamps: An option that, when set to true, tells Mongoose to automatically manage createdAt and updatedAt fields for each record.

import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    session_id: {
      type: String,
      trim: true,
      required: true,
    },
    session_date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Log any errors that occur while creating indexes for the User schema
SessionSchema.on("index", function (error) {
  console.log(error); // If there's an error, it will log it
});

// Set TTL to 24 hours from creation time
SessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // 24 hours in seconds 86400

export default mongoose.model("Session", SessionSchema);
