const express = require("express");
const { validateBody } = require("../../decorators/index.js");
const { userSignUpSchema, userSignInSchema, userVerifyEmailSchema } = require("../../schemas/index.js");
const { authController } = require("../../controllers/index.js");
const { authenticate, isEmptyBody } = require("../../middlewars/index.js");

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(userSignUpSchema), authController.signUp);
authRouter.post("/login", isEmptyBody, validateBody(userSignInSchema), authController.signIn);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.get("/verify/:verificationToken", authController.verifyToken);
authRouter.post("/verify", isEmptyBody, validateBody(userVerifyEmailSchema), authController.resendEmailVerify);

module.exports = authRouter;