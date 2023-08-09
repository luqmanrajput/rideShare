const joi = require("joi");

const longlatSchema = joi.object({
  longitude: joi.number().required(),
  latitude: joi.number().required(),
});

const rideRequestSchema = joi.object({
  startLocation: longlatSchema.required(),
  endLocation: longlatSchema.required(),
});

module.exports = {
  rideRequestSchema,
};
