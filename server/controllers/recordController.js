// recordController.js
// location:  /server/controllers / recordController.js
// This file is the controller for the Record model.
// It is maintianed for troubleshooting purposes. It is not used
// in the application. It will be removed in the future.

import Record from "../db/MongoDB/Schema/record.schema.js";

// This section will help you get a list of all records.
const getAllRecords = async (req, res) => {
  try {
    let results = await Record.find({});
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This section will help you get a single record by id.
const getRecordById = async (req, res) => {
  try {
    let result = await Record.findById(req.params.id);
    if (!result) res.status(404).json({ message: "Not found" });
    else res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This section will help you create a new record.
const createRecord = async (req, res) => {
  const newRecord = new Record({
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  });

  try {
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
      { new: true }
    );
    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
};
