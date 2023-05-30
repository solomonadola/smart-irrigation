// services/AuthService
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const microcontroller = require("../models/microcontroller");
const User = require("../models/user");
const Microcontroller = require("../models/microcontroller");
const Sensor = require("../models/sensor");
// Store user and microcontroller data in the database
exports.register = async (userData, microcontrollerData) => {
  try {
    //add some validation here

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    //creating user
    const user = new User(userData);
    user.password = hashedPassword;

    const mcc = new Microcontroller(microcontrollerData);
    const sensor1 = new Sensor({
      serial_number: microcontrollerData.serial_number,
      sensing_type: "moisture",
    });
    const sensor2 = new Sensor({
      serial_number: microcontrollerData.serial_number,
      sensing_type: "temprature",
    });
    const sensor3 = new Sensor({
      serial_number: microcontrollerData.serial_number,
      sensing_type: "humidity",
    });
    await mcc.save();
    await user.save();
    await sensor1.save();
    await sensor2.save();
    await sensor3.save();
    return [user, mcc, sensor1, sensor2, sensor3];
  } catch (error) {
    throw new Error("Failed to store registration data", error);
  }
};

//login api implementation

exports.login = async (serial_number, password) => {
  // Find the user by loginId in the database
  const user = await User.findOne({ serial_number: serial_number });
  console.log(user);
  // If user not found, return an error message
  if (!user || user === null) {
    //response code for non-existing user
    return "this user doesn't exist";
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // If passwords do not match, return an error
  if (!isPasswordValid) {
    //responose for for worong credential
    return "incorrect credential";
  }

  // Generate a JSON Web Token (JWT)
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log(user);
  return token;
};
