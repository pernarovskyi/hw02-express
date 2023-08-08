const express = require("express");
const { validateBody } = require("../../decorators/index.js");
const { userSignUpSchema, userSignInSchema } = require("../../schemas/index.js");
const { authController } = require("../../controllers/index.js");
const { authenticate, isEmptyBody, upload } = require("../../middlewars/index.js");

const authRouter = express.Router();

authRouter.post("/signup", upload.single("avatar"), isEmptyBody, validateBody(userSignUpSchema), authController.signUp);
authRouter.post("/login", isEmptyBody, validateBody(userSignInSchema), authController.signIn);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);

module.exports = authRouter;