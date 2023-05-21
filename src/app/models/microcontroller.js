const mongoose = require("mongoose");
const microcontrollerSchema = mongoose.Schema({
  serial_number: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Microcontroller", microcontrollerSchema);
