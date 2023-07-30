const User = require("../models/user.js");
const { HttpError } = require("../helpers/index.js");
const { ctrlWrapper } = require("../decorators/index.js");


const signUp = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email});

    if(user) {
        throw HttpError(409, "Email already in use.");
    }
    const newUser = await User.create(req.body);

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}

module.exports = {
    signUp: ctrlWrapper(signUp),
}