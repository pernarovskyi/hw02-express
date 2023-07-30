const { Schema, model } = require("mongoose");
const { validateWhenUpdate, handleSaveError } = require("./hooks.js");
const { userEmailRegex } = require("../constants/userConstants.js");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: userEmailRegex,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate",validateWhenUpdate);
userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);


module.exports = User;