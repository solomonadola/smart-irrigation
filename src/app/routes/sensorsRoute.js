// routes/devices.js
const express = require("express");
const router = express.Router();

// require controllers here
const { handleSensorData } = require("../controllers/sensorsController");
// GET /req
router.get("/data", (req, res) => {
  // Logic to handle GET /request
  // logic to handle the get request
  res.send(req.body);
});

// POST /req to store sensor reading into database
router.post("/data", handleSensorData);

module.exports = router;
