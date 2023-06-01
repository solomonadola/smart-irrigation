const Joi = require("joi");
// validation

const validation = require("./validation_schema");

async function validateRegistration(data) {
  const { error } = validation.userSchema.validate(data);
  return error;
}

module.exports = {
  validateRegistration,
};
