const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/new", NotificationController.getUnreadNotifications);
module.exports = router;
