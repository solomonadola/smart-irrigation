// services/sensorService.js

const SensorData = require("../models/sensor_reading");

// Store sensor data in the database
exports.storeSensorData = async (data) => {
  try {
    //add some validation here
    const sensorData = new SensorData(data);
    await sensorData.save();
    return sensorData;
  } catch (error) {
    throw new Error("Failed to store sensor data");
  }
};
