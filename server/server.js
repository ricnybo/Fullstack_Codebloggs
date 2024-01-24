// server.js
// location:  /server/server.js
// This file is the entry point for the server.

import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import records from "./routes/recordRoutes.js";
import { connectDB } from "./db/conn.js";

const PORT = process.env.PORT || 5000;
const app = express();

connectDB(); // Connect to the database

app.use(cors());
app.use(express.json());

app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
