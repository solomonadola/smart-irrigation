// controllers/sensorsController.js

const sensorsService = require("../services/sensorsService");

// Handle the received data from the sensor
const getAnalyzedData = async (data) => {
  //give the req body to the sensors service
  const sensorData = [
    data.moisture.reading,
    data.temperature.reading,
    data.humidity.reading,
  ];
  const prediction = await sensorsService.predictAction(sensorData);
  return prediction;
};

//store and analyze recived sensor data
exports.handleSensorData = async (req, res) => {
  try {
    // the validation of data goes here or in the service handler
    const sensorData = await sensorsService.storeSensorData(req.body);
    const prediction = await getAnalyzedData(req.body);
    res.status(200).json({
      message: "Sensor data received stored and analyzed successfully",
      data: sensorData,
      predict: prediction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to store sensor data" });
  }
};
