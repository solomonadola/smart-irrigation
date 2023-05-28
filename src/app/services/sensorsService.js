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
    //add some validation here
    const { moisture, temperature, humidity, serial_number } = data;
    const sensor1 = Sensor.find({
      serial_number: serial_number,
      sensing_type: "moisture",
    })
      .select("_id")
      .exec();
    const sensor2 = Sensor.find({
      serial_number: serial_number,
      sensing_type: "temprature",
    });
    const sensor3 = Sensor.find({
      serial_number: serial_number,
      sensing_type: "humidity",
    })
      .select("_id")
      .exec();

    Promise.all([sensor1, sensor2, sensor3])
      .then(([sensor1, sensor2, sensor3]) => {
        const sensor1Id = sensor1[0]._id.toString();
        const sensor2Id = sensor2[0]._id.toString();
        const sensor3Id = sensor3[0]._id.toString();

        // Use the sensor IDs as needed
        moisture.sensor = sensor1Id;
        temperature.sensor = sensor2Id;
        humidity.sensor = sensor3Id;

        SensorReading.insertMany([moisture, temperature, humidity])
          .then((createdSensors) => {
            console.log("Sensors created:", createdSensors);
            return createdSensors;
            // Handle the success response
          })
          .catch((error) => {
            console.error("Error while creating sensors:", error);
            // Handle the error response
          });
      })
      .catch((error) => {
        console.error("Error while finding sensors:", error);
        // Handle the error response
      });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to store sensor data");
  }
};
