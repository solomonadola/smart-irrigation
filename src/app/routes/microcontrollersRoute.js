// routes/devices.js
const express = require("express");
const router = express.Router();

// GET /req
router.get("/data", (req, res) => {
  // Logic to handle GET /request
  res.send("List of requests");
});

// POST /req
router.post("/data", (req, res) => {
  // Logic to handle POST /req
  console.log(req.body);
});

module.exports = router;
