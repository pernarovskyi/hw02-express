const { contactsSchema, contactsUpdateFavoriteSchema} = require("./contactsSchema.js");
const { userSignUpSchema, userSignInSchema } = require("./usersSchema.js");

module.exports = {
    contactsSchema,
    contactsUpdateFavoriteSchema,
    userSignUpSchema,
    userSignInSchema,
  };