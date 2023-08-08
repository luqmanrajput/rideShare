const joi = require("joi");

const signupSchema = new joi.object({
  name: joi.string().min(4).required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
});
const loginSchema = new joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
});
const updateSchema = new joi.object({
  name: joi.string().min(4).required(),
  email: joi.string().email().required(),
});

module.exports = { signupSchema, loginSchema, updateSchema };
