// routes/devices.js
const express = require("express");
const router = express.Router();

// require controllers here
const {
  handleSensorData,
  getSensorReadings,
} = require("../controllers/sensorsController");
// GET /req

// send sensors data to store and analyze
router.post("/data", handleSensorData);
router.get("/data/:serial_number", getSensorReadings);

module.exports = router;
