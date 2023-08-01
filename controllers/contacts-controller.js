const Contact = require("../models/contact.js");
const { HttpError } = require("../helpers/index.js");
const { ctrlWrapper } = require("../decorators/index.js");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  
  const { page = 1, limit = 10} = req.query;
  const skip = (page - 1) * limit;
  
  const contacts = await Contact
    .find({ owner }, "-createdAt -updatedAt", { skip, limit })
    .populate("owner", "email subscription");
  
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const add = async (req, res) => {

  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner});

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id, "-createdAt -updatedAt");

  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: {
      result,
    },
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
