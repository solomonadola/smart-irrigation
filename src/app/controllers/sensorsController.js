// controllers/sensorsController.js

const sensorsService = require("../services/sensorsService");

// Handle the received data from the MCC sensors
exports.getAnalyzedData = async (req, res) => {};
exports.handleSensorData = async (req, res) => {
  try {
    //should the validation of data goes here or in the service handler
    const sensorData = await sensorsService.storeSensorData(req.body);
    res.status(200).json({
      message: "Sensor data received and stored successfully",
      data: sensorData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to store sensor data" });
  }
};
