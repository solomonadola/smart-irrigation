// services/sensorService.js

const SensorReading = require("../models/sensor_reading");
const Sensor = require("../models/sensor");

// Store sensor data in the database
exports.getSensorData = async () => {
  // i can't just simply send the sensor data here it requires processed data
  // that can be used by the microcontroller to do its operation
  // but for the test purpose i'm going to send mock data
};
exports.storeSensorData = async (data) => {
  try {
    //add some validation here
    const { moisture, tempHumidity } = data;
    const sensor1 = Sensor.find({
      serial_number: moisture.serial_number,
      sensing_type: "moisture",
    })
      .select("_id")
      .exec();
    const sensor2 = Sensor.find({
      serial_number: tempHumidity.serial_number,
      sensing_type: "temprature_humidity",
    })
      .select("_id")
      .exec();

    Promise.all([sensor1, sensor2])
      .then(([sensor1, sensor2]) => {
        const sensor1Id = sensor1[0]._id.toString();
        const sensor2Id = sensor2[0]._id.toString();

        // Use the sensor IDs as needed
        moisture.sensor = sensor1Id;
        tempHumidity.sensor = sensor2Id;
        SensorReading.insertMany([moisture, tempHumidity])
          .then((createdSensors) => {
            console.log("Sensors created:", createdSensors);
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
