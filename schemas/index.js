const { contactsSchema, contactsUpdateFavoriteSchema} = require("./contactsSchema.js");
const { userSignUpSchema, userSignInSchema, userSubscriptionSchema } = require("./usersSchema.js");

module.exports = {
    contactsSchema,
    contactsUpdateFavoriteSchema,
    userSignUpSchema,
    userSignInSchema,
    userSubscriptionSchema
  };