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

const router = express.Router();

router.get("/", getAllRecords);
router.get("/:id", getRecordById);
router.post("/", createRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export default router;
