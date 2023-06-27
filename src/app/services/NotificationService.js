// // services/notificationService.js

const Notification = require("../models/notification");

// // Function to retrieve the latest unread notifications for a user
exports.getLatestUnreadNotifications = async (serial_number) => {
    try {
        // Fetch unread notifications from the database based on the serial number
        const unreadNotifications = await Notification.find({
            serial_number: serial_number
            , status: 'unread'
        }).sort({ readingTime: -1 }).limit(10);
        return unreadNotifications;
    } catch (error) {
        throw new Error('Failed to fetch unread notifications');
    }
};
