const Joi = require("joi");
// // user Joi schema
const userSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirmPasswor: Joi.ref("password"),
  email: Joi.string().email().required(),
  phone_number: Joi.number().required(),
  serial_number: Joi.string().required(),
  username: Joi.string().min(3).max(30),
  location: Joi.string().min(3).max(30),
  user_type: Joi.string().valid("farmer", "agronomist"),
});

module.exports = {
  userSchema,
};
