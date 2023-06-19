const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");

router.get("/new", NotificationController);
module.exports = router;
