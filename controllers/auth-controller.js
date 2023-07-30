const User = require("../models/user.js");
const { HttpError } = require("../helpers/index.js");
const { ctrlWrapper } = require("../decorators/index.js");
const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use.");
  }

  const hashPassword = await hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
    
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const validPassword = await compare(password, user.password);

  if (!validPassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1h"});

  res.json({
    token,
    user: {
        email: email,
        subscription: user.subscription,
    }
  });
};

module.exports = {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
};
