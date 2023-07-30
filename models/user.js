const { Schema, model } = require("mongoose");
const { validateWhenUpdate, handleSaveError } = require("./hooks.js");
const { userEmailRegex } = require("../constants/userConstants.js");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: userEmailRegex,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate",validateWhenUpdate);
userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);


module.exports = User;