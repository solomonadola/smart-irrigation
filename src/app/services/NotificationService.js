// // services/notificationService.js

// const Notification = require("../models/notification");

// // Function to retrieve the latest unread notifications for a user
// exports.getLatestUnreadNotifications = async (userId) => {
//   try {
//     const latestUnreadNotifications =
//       await Notification.getUnreadNotificationsByUserId(userId);
//     return latestUnreadNotifications;
//   } catch (error) {
//     throw new Error("Failed to retrieve latest unread notifications.");
//   }
// };

// // Function to mark a notification as read
// exports.markNotificationAsRead = async (notificationId) => {
//   try {
//     await Notification.markNotificationAsRead(notificationId);
//   } catch (error) {
//     throw new Error("Failed to mark notification as read.");
//   }
// };
