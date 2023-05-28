const express = require("express");
const router = express.Router();
const { handleRegistration } = require("../controllers/AuthController");
router.post("/", handleRegistration);

module.exports = router;
