// routes/devices.js
const express = require("express");
const router = express.Router();

// require controllers here
const { handleSensorData } = require("../controllers/sensorsController");
// GET /req

// send sensors data to store and analyze
router.post("/data", handleSensorData);

module.exports = router;
