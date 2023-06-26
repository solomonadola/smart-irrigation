const mongoose = require("mongoose");
const scheduleSchema = mongoose.Schema({
  serial_number: {
    type: String,
    ref: microcontrollers,
  },
  start_time: {
    type: Date,
    default: Date.now,
  },

  end_time: {
    type: Date,
    default: "",
  },
});
exports.Schedule = mongoose.model("Schedule", scheduleSchema);
