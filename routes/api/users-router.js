const express = require("express");
const { validateBody } = require("../../decorators/index.js");
const { userSubscriptionSchema } = require("../../schemas/index.js");
const { userController } = require("../../controllers/index.js");
const { authenticate, upload } = require("../../middlewars/index.js");

const userRouter = express.Router();

userRouter.patch("/", authenticate, validateBody(userSubscriptionSchema), userController.updateSubscription);
userRouter.patch("/avatars", authenticate, upload.single("avatar"), userController.updateAvatar);

module.exports = userRouter;