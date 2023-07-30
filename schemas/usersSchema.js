const Joi = require("joi");
const { userEmailRegex } = require("../constants/userConstants.js");

const userSignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(userEmailRegex).message("Error. Wrong email format").required(),
  password: Joi.string().min(6).required(),
});

const userSignInSchema = Joi.object({
  email: Joi.string().pattern(userEmailRegex).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  userSignUpSchema,
  userSignInSchema,
};
