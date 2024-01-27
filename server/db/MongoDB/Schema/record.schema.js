// record.schema.js (location:  /server/db/MongoDB/Schema/record.schema.js)
// This file is the schema for the Record model.
// It is maintianed for troubleshooting purposes. It is not used
// in the application. It will be removed in the future.
import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    level: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Record", recordSchema);
