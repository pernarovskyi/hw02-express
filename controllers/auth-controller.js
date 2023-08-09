const User = require("../models/user.js");
const { HttpError } = require("../helpers/index.js");
const { ctrlWrapper } = require("../decorators/index.js");
const { hash, compare } = require("bcryptjs");
const gravatar = require("gravatar");
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
  
  const httpUrl = gravatar.url(email, {protocol: 'http', s: '300'});
 
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL: httpUrl });

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
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
        email: email,
        subscription: user.subscription,
    }
  });
};

const getCurrent = (req,res) => {
    const { email, subscription } = req.user;

    res.json({        
        email,
        subscription,
    });
}

const logout = async (req, res) => {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(204).json({
        status: "success",
        code: 204,
        message: "No Contetnt",
    });
}

module.exports = {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
