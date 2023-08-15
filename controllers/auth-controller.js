const User = require("../models/user.js");
const { HttpError } = require("../helpers/index.js");
const { ctrlWrapper } = require("../decorators/index.js");
const { hash, compare } = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { nanoid } = require("nanoid");
const { sendVerificationEmail } = require("../helpers/index.js");

dotenv.config();
const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use.");
  }

  const hashPassword = await hash(password, 10);

  const httpUrl = gravatar.url(email, { protocol: "http", s: "250" });

  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: httpUrl,
    verificationToken,
  });
 
  await sendVerificationEmail(email, verificationToken);

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

  if(!user.verify) {
    throw HttpError(401, "Email is not verified.");
  }

  const validPassword = await compare(password, user.password);

  if (!validPassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    status: "success",
    code: 204,
    message: "No Contetnt",
  });
};

const verifyToken = async (req, res) => {
  const { verificationToken } = req.params;
  
  const user = await User.findOne({verificationToken});
  
  if (!user) {
    throw HttpError(404, "User not found.");
  }
  
  await User.findByIdAndUpdate(user._id, {verificationToken: "", verify: true});
 
  res.json({
    status: "success",
    code: 200,
    message: "Verification successful.",
  });
}

const resendEmailVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({email});

  if(!user) {
    throw HttpError(404, "Email not found.");
  }

  if(user.verify) {
    throw HttpError(400, "Verification has already been passed.");
  }

  await sendVerificationEmail(email, user.verificationToken);

  res.json({
    status: "success",
    code: 200,
    message: "Email has been sent to your mailbox. Please check."
  });
}

module.exports = {
  signUp: ctrlWrapper(signUp),
  verifyToken: ctrlWrapper(verifyToken),
  resendEmailVerify: ctrlWrapper(resendEmailVerify),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),  
};
