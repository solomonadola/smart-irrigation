// controllers/sensorsController.js

const sensorsService = require("../services/sensorsService");
const { Schedule } = require("../models/schedule");
const { Notification } = require("../models/notification");

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
    //handle the schedule login down here
    const { serial_number } = req.body;
    const start_time = new Date(Date.now() + prediction * 60 * 60 * 1000);
    // Create a new schedule instance
    const schedule = new Schedule({
      serial_number,
      start_time,
    });
    const notification = new Notification({
      serial_number,
      body: "the irrigation is scheduled for " + start_time,
    });

    // Save the schedule to the database
    await schedule.save();
    await notification.save();

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
