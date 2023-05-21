// services/sensorService.js

const microcontroller = require("../models/microcontroller");
const User = require("../models/user");
const Microcontroller = require("../models/microcontroller");

// Store user and microcontroller data in the database
exports.register = async (userData, microcontrollerData) => {
  console.log(userData, microcontrollerData);
  try {
    //add some validation here

    const user = new User(userData);
    const mcc = new Microcontroller(microcontrollerData);
    await mcc.save();
    await user.save();
    return [user, mcc];
  } catch (error) {
    throw new Error("Failed to store registration data");
  }
};
