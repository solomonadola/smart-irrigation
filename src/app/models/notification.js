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
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "unread",
  },
});
exports.Notification = mongoose.model("Notification", notificationSchema);
