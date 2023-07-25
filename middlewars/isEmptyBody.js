const { HttpError } = require("../helpers/index.js");

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);

  if (!length) {
    next(HttpError(400, "Missing required fields"));
  }
  next();
};

module.exports = isEmptyBody;
