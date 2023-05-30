const authService = require("../services/AuthService");

// Handle recived registration data
exports.handleRegistration = async (req, res) => {
  try {
    //should the validation of data goes here or in the service handler
    const { serial_number, location, ...user } = req.body;
    user.serial_number = serial_number;
    const registrationData = await authService.register(user, {
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

exports.handleLogin = async (req, res) => {
  try {
    const { serial_number, password } = req.body;
    const token = await authService.login(serial_number, password);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
