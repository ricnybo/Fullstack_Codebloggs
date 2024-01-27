// recordRoutes.js (location:  /server/routes/record.js)
// This file is the router for the Record model. It is maintianed
// for troubleshooting purposes. It is not used in the application.
// It will be removed in the future.

import express from "express";
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
} from "../controllers/recordController.js";

const recordRouter = express.Router();

recordRouter.get("/", getAllRecords);
recordRouter.get("/:id", getRecordById);
recordRouter.post("/", createRecord);
recordRouter.put("/:id", updateRecord);
recordRouter.delete("/:id", deleteRecord);

export default recordRouter;
