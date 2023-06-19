const mongoose = require("mongoose");
const notificationSchema = mongoose.Schema({
  serial_number: {
    type: mongoose.Schema.Types.ObjectId,
    ref: microcontrollers,
  },
  body: {
    type: String,
    default: "",
  },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});
exports.Notification = mongoose.model("Notification", notificationSchema);
// Function to get unread notifications for a user
exports.getUnreadNotificationsByUserId = async (serial_number) => {
  try {
    const notifications = await Notification.find({
      serial_number: serial_number,
      read: false,
    }).sort({ timestamp: -1 });
    return notifications;
  } catch (error) {
    throw new Error("Failed to retrieve unread notifications.");
  }
};

// Function to mark a notification as read
exports.markNotificationAsRead = async (notificationId) => {
  try {
    await Notification.findByIdAndUpdate(notificationId, { read: true });
  } catch (error) {
    throw new Error("Failed to mark notification as read.");
  }
};
