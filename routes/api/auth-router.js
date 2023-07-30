const express = require("express");
const { validateBody } = require("../../decorators/index.js");
const { userSignUpSchema, userSignInSchema } = require("../../schemas/index.js");
const { authController } = require("../../controllers/index.js");

const authRouter = express.Router();

authRouter.post("/signup", validateBody(userSignUpSchema), authController.signUp);
authRouter.post("/login", validateBody(userSignInSchema), authController.signIn);

module.exports = authRouter;