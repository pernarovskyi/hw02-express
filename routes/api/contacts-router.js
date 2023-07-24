const express = require("express");
const router = express.Router();
const { contactsSchema, contactsUpdateFavoriteSchema } = require("../../schemas/index.js");
const { validateBody } = require("../../decorators/index.js");
const { contactsController } = require("../../controllers/index.js");
const { isValidId, isEmptyBody } = require("../../middlewars/index.js");

router.get("/", contactsController.getAll);

router.get("/:id", isValidId, contactsController.getById);

router.post("/", isEmptyBody, validateBody(contactsSchema), contactsController.add);

router.delete("/:id", isValidId, contactsController.removeById);

router.put("/:id", isEmptyBody, isValidId, validateBody(contactsSchema), contactsController.updateById);

router.patch("/:id/favorite", isEmptyBody, isValidId, validateBody(contactsUpdateFavoriteSchema), contactsController.updateFavorite);

module.exports = router;