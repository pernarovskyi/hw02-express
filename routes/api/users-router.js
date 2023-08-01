const express = require("express");
const { validateBody } = require("../../decorators/index.js");
const { userSubscriptionSchema } = require("../../schemas/index.js");
const { userController } = require("../../controllers/index.js");
const { authenticate } = require("../../middlewars/index.js");

const userRouter = express.Router();

userRouter.patch("/", authenticate, validateBody(userSubscriptionSchema), userController.updateSubscription);

module.exports = userRouter;