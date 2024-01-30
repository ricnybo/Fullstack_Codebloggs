// server.js
// location:  /server/server.js
// This file is the entry point for the server.

import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import records from "./routes/recordRoutes.js";
import userRouter from "./routes/userRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import { connectDB } from "./db/conn.js";
import cookieParser from "cookie-parser";

const PORT = process.env.SERVER_PORT || 5000;
const app = express();

connectDB(); // Connect to the database

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/record", records);
app.use("/user", userRouter);
app.use("/", sessionRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
