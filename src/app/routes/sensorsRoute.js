// routes/devices.js
const express = require("express");
const router = express.Router();

// require controllers here
const {
  handleSensorData,
  getAnalyzedData,
} = require("../controllers/sensorsController");
// GET /req
router.get("/data", getAnalyzedData);

// POST /req to store sensor reading into database
router.post("/data", handleSensorData);

module.exports = router;
