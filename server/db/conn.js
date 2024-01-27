// connect to MongoDB - conn.js
//location:  /server/db/conn.js
// This file is the connection to the MongoDB database.
// It uses the mongoose package to connect to the database.

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const atlas_uri = process.env.ATLAS_URI;
    await mongoose.connect(atlas_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err);
  }
};

connectDB();

export default mongoose;
