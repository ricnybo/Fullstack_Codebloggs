// user.Schema.js is the schema for the User model.
// location:  /server/db/MongoDB/Schema/user.Schema.js

// Here's a brief explanation of your schema:

// first_name, last_name, email, password, status, location, occupation, auth_level:
//    These are all strings that are required.The email field is also unique.
// birthday: A date that is required.
// timestamps: An option that, when set to true, tells Mongoose to automatically manage createdAt
//    and updatedAt fields for each record.
// Using a pre-save hook to hash the password before saving the user model to the database.
// Using an index to ensure that the email field is unique.

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

dotenv.config({ path: "../../.env" });

const hashSalt = Number(process.env.HASH_SALT);

// User Schema for MongoDB
const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: Date, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please fill a valid email address",
      ],
    },
    password: { type: String, required: true },
    status: { type: String, required: true },
    location: { type: String, required: true },
    occupation: { type: String, required: true },
    auth_level: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash the password before saving the User model
UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, hashSalt || 10);
  }
  next();
});

// Log any errors that occur while creating indexes for the User schema
UserSchema.on("index", function (error) {
  console.log(error); // If there's an error, it will log it
});

// Create an index for the email field
UserSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("User", UserSchema);
