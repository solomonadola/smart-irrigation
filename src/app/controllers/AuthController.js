const registirationService = require("../services/AuthService");

// Handle the received data from the MCC sensors
exports.handleRegistration = async (req, res) => {
  try {
    //should the validation of data goes here or in the service handler
    const { serial_number, location, ...user } = req.body;
    const registrationData = await registirationService.register(user, {
      serial_number,
      location,
    });
    res.status(200).json({
      message: "registration data received and stored successfully",
      data: registrationData,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to store registration data" });
  }
};
