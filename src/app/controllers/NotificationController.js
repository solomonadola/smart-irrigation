const jwt = require("jsonwebtoken");
const Notification = require("../models/notification"); // Assuming you have a Notification model defined

exports.getNotifications = (req, res) => {
  const token = req.headers.authorization;

  // Verify and decode the token to get the user information
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Handle token verification error
      res.status(401).json({ error: "Unauthorized" });
    } else {
      const userId = decoded.userId;

      // Fetch notifications from the database based on the user ID
      Notification.find({ userId })
        .then((notifications) => {
          res.json({ notifications });
        })
        .catch((error) => {
          // Handle database fetch error
          res.status(500).json({ error: "Failed to fetch notifications" });
        });
    }
  });
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
