const User = require("../models/user.js");
const { HttpError } = require("../helpers/index.js");
const { ctrlWrapper } = require("../decorators/index.js");
const fs = require("fs/promises");
const path = require("path");

const avatarPath = path.resolve("public", "avatars");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id: userId } = req.user;

  const result = await User.findByIdAndUpdate(
    userId,
    { subscription },
    { new: true, select: "email subscription" }
  );

  if (!result) {
    throw HttpError(404, `Contact with id=${userId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    result,
  });
};

const updateAvatar = async (req, res) => {
  const { _id: userId } = req.user;

  if (!req.file) {    
    const result = await User.findByIdAndUpdate(
      userId,
      { avatarURL: "" },
      { new: true, select: "avatarURL" }
    );

    res.json({
      status: "success",
      code: 200,
      result,
    });
    return;
  }

  const { path: oldAvatarPath, filename } = req.file;
  const newAvatarPath = path.join(
    avatarPath,
    filename
  );

  await fs.rename(oldAvatarPath, newAvatarPath);

  const result = await User.findByIdAndUpdate(
    userId,
    { avatarURL: newAvatarPath },
    { new: true, select: "avatarURL" }
  );

  if (!result) {
    throw HttpError(404, `Contact with id=${userId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    result,
  });
};

const verifyToken = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({verificationToken});

  if (!user) {
    throw HttpError(404, "User not found.");
  }
  
  await User.findByIdAndUpdate(user._id, {verificationToken: null, verify: true});

  res.json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
}

module.exports = {
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyToken: ctrlWrapper(verifyToken),
};
