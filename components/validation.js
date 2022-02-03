//VALIDATION
const Joi = require("@hapi/joi");

//Register Validation

const registerValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    full_name: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.string().min(6).required().valid(Joi.ref("password")),
  };
  return Joi.validate(data, schema);
};

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
