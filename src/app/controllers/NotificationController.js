// controllers/notificationController.js

const Notification = require("../models/notification");
const notificationService = require("../services/notificationService");

// Get latest unread notifications for a user
exports.getLatestUnreadNotifications = async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming userId is provided in the query string

    // Retrieve the latest unread notifications using the notification service
    const latestUnreadNotifications =
      await notificationService.getLatestUnreadNotifications(userId);

    // Send the latest unread notifications as the response
    res.json({
      notifications: latestUnreadNotifications,
    });
  } catch (error) {
    // Handle and send an appropriate error response
    res
      .status(500)
      .json({ error: "Failed to retrieve latest unread notifications." });
  }
};

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.notificationId; // Assuming the notificationId is provided in the URL parameter

    // Mark the notification as read using the notification service
    await notificationService.markNotificationAsRead(notificationId);

    // Send a success response
    res.json({ message: "Notification marked as read." });
  } catch (error) {
    // Handle and send an appropriate error response
    res.status(500).json({ error: "Failed to mark notification as read." });
  }
};
