const { contactsSchema, contactsUpdateFavoriteSchema} = require("./contactsSchema.js");
const { userSignUpSchema, userSignInSchema, userSubscriptionSchema, userVerifyEmailSchema } = require("./usersSchema.js");

module.exports = {
    contactsSchema,
    contactsUpdateFavoriteSchema,
    userSignUpSchema,
    userSignInSchema,
    userSubscriptionSchema,
    userVerifyEmailSchema
  };