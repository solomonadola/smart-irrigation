// services/sensorService.js

const SensorReading = require("../models/sensor_reading");
const Sensor = require("../models/sensor");
const { prediction } = require("../ml/ml-knn");

// Store sensor data in the database
exports.predictAction = async (sensorData) => {
  // here we can get the predicted action from the ml
  const predicted = await prediction(sensorData);
  return predicted;
};
exports.storeSensorData = async (data) => {
  try {
    // Add validation here

    const { moisture, temperature, humidity, serial_number } = data;

    const sensor1 = await Sensor.findOne({
      serial_number: serial_number,
      sensing_type: "moisture",
    });

    const sensor2 = await Sensor.findOne({
      serial_number: serial_number,
      sensing_type: "temperature",
    });
    const sensor3 = await Sensor.findOne({
      serial_number: serial_number,
      sensing_type: "humidity",
    });

    const sensor1Id = sensor1._id.toString();
    const sensor2Id = sensor2._id.toString();
    const sensor3Id = sensor3._id.toString();
    moisture.sensor = sensor1Id;
    temperature.sensor = sensor2Id;
    humidity.sensor = sensor3Id;

    const createdSensors = await SensorReading.insertMany([
      moisture,
      temperature,
      humidity,
    ]);

    // Handle the success response
    return createdSensors;
  } catch (error) {
    console.error("Error while storing sensor data:", error);
    // Handle the error response
    throw new Error("Failed to store sensor data");
  }
};
