import express from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import * as contactsController from "../controllers/contactsController.js";
import { isValidID } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { requireUser } from "../middlewares/requireUser.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import {
  addContactSchema,
  updateContactSchema,
} from "../validation/contactsSchemas.js";
import { ROLES } from "../constants/index.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.use(authenticate, requireUser);

router.get("/", ctrlWrapper(contactsController.getAllContactsController));

router.get(
  "/:contactId",
  isValidID,
  checkRoles(ROLES.ADMIN, ROLES.USER),
  ctrlWrapper(contactsController.getContactByIdController)
);

router.post(
  "/",
  upload.single("photo"),
  validateBody(addContactSchema),
  ctrlWrapper(contactsController.createContactController)
);

router.patch(
  "/:contactId",
  isValidID,
  checkRoles(ROLES.ADMIN, ROLES.USER),
  upload.single("photo"),
  validateBody(updateContactSchema),
  ctrlWrapper(contactsController.updateContactController)
);

router.put(
  "/:contactId",
  isValidID,
  checkRoles(ROLES.ADMIN, ROLES.USER),
  upload.single("photo"),
  validateBody(addContactSchema),
  ctrlWrapper(contactsController.updateContactController)
);

router.delete(
  "/:contactId",
  isValidID,
  checkRoles(ROLES.ADMIN, ROLES.USER),
  ctrlWrapper(contactsController.deleteContactController)
);

export default router;
