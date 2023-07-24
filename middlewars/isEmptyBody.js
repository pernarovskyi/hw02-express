const { HttpError } = require("../helpers/index.js");

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);

  if (!length) {
    next(HttpError(400, "Body require filds"));
  }
  next();
};

module.exports = isEmptyBody;
