const User = require("../models/user.js");
const { HttpError } = require("../helpers/index.js");
const { ctrlWrapper } = require("../decorators/index.js");

const updateSubscription = async (req, res) => {
    const { subscription } = req.body;
    const { _id: userId } = req.user;

    const result = await User
    .findByIdAndUpdate(userId, { subscription }, { new: true, select: "email subscription"});
  
    if(!result) {
        throw HttpError(404, `Contact with id=${userId} not found`);
    }

    res.json({
        status: "success",
        code: 200,
        result,
      });
}

module.exports = {
    updateSubscription: ctrlWrapper(updateSubscription),
}