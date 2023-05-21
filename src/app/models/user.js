const { string } = require("joi");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone_number: {
    type: Number,
    require: true,
  },
  serial_number: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("User", userSchema);
