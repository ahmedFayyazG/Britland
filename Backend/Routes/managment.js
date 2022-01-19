const express = require("express");
const {
  createManagment,
  getAllManagment,
  updateManagement,
  deleteManagement,
} = require("../Controller/management");

const router = express.Router();

router.post("/management/create", createManagment);
router.get("/management", getAllManagment);
router.put("/management/:id", updateManagement);
router.delete("/management/:id", deleteManagement);

module.exports = router;
