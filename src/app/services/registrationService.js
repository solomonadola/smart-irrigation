// services/sensorService.js

const microcontroller = require("../models/microcontroller");
const User = require("../models/user");
const Microcontroller = require("../models/microcontroller");
const Sensor = require("../models/sensor");
// Store user and microcontroller data in the database
exports.register = async (userData, microcontrollerData) => {
  console.log(userData, microcontrollerData);
  try {
    //add some validation here
    const user = new User(userData);
    const mcc = new Microcontroller(microcontrollerData);
    const sensor1 = new Sensor({
      serial_number: microcontrollerData.serial_number,
      sensing_type: "moisture",
    });
    const sensor2 = new Sensor({
      serial_number: microcontrollerData.serial_number,
      sensing_type: "temprature_humidity",
    });
    await mcc.save();
    await user.save();
    await sensor1.save();
    await sensor2.save();
    return [user, mcc, sensor1, sensor2];
  } catch (error) {
    throw new Error("Failed to store registration data", error);
  }
};
