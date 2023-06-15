const authService = require("../services/AuthService");
const {
  validateRegistration,
  validateLogin,
} = require("../../utils/Validation");
// Handle recived registration data
exports.handleRegistration = async (req, res) => {
  try {
    // the validation of data goes here
    const error = await validateRegistration(req.body);
    if (error) {
      return res.send(error.details);
    }
    const { serial_number, location, ...user } = req.body;
    user.serial_number = serial_number;
    const registrationData = await authService.register(user, {
      serial_number,
      location,
    });
    res.status(200).json({
      message: "registration successful",
      data: registrationData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to store registration data" });
  }
};

exports.handleLogin = async (req, res) => {
  try {
    const error = await validateLogin(req.body);
    if (error) {
      return res.send(error.details);
    }
    const token = await authService.login(req.body);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
