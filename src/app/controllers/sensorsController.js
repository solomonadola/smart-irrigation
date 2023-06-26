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
      predict: prediction,
      sensorData: sensorData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to store sensor data" + error });
  }
};
exports.getSensorReadings = async (req, res) => {
  try {
    const { serial_number } = req.params;

    const sensorReadings = await sensorsService.getSensorReadings(
      serial_number
    );

    res.json({ sensorReadings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sensor readings" });
  }
};
