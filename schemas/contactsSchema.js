const Joi = require("joi");
const { contactEmailRegex, contactPhoneRegex } = require("../constants/contactConstants.js");

const contactsSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string()
      .min(6)
      .regex(contactEmailRegex)
      .message("Wrong email format")
      .required(),
    phone: Joi.string()
      .min(6)
      .regex(contactPhoneRegex)
      .message("Wrong format. Example: (000) 111-1234")
      .required(),
    favorite: Joi.boolean(),
  });

  const contactsUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean()    
    .required(),    
  });

  module.exports = {
    contactsSchema,
    contactsUpdateFavoriteSchema,
  };