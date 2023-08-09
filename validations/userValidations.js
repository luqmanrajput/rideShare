const joi = require("joi");

const signupSchema = new joi.object({
  name: joi.string().min(4).required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
  role: joi.string().required(),
});
const loginSchema = new joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
});
const updateSchema = new joi.object({
  name: joi.string().min(4).required(),
  email: joi.string().email().required(),
});

const changePasswordSchema = joi.object({
  current_password: joi.string().min(4).required(),
  new_password: joi.string().min(4).required(),
});

module.exports = {
  signupSchema,
  loginSchema,
  updateSchema,
  changePasswordSchema,
};
