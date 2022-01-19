const express = require("express");
const {
  createLandlord,
  getAllLandlord,
  deleteLandlord,
  updateLandlord,
} = require("../Controller/landlord");
const router = express.Router();

router.post("/landlord/create", createLandlord);
router.get("/landlord", getAllLandlord);
router.put("/landlord/:id", updateLandlord);
router.delete("/landlord/:id", deleteLandlord);

module.exports = router;
