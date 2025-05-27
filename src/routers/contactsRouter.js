import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import * as contactsController from '../controllers/contactsController.js';
import { isValidID } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { addContactSchema, updateContactSchema } from '../validation/contactsSchemas.js';

const router = express.Router();

router.get('/', ctrlWrapper(contactsController.getAllContactsController));

router.get('/:contactId', isValidID, ctrlWrapper(contactsController.getContactByIdController));

router.post(
  '/',
  validateBody(addContactSchema),
  ctrlWrapper(contactsController.createContactController)
);

router.patch(
  '/:contactId',
  isValidID,
  validateBody(updateContactSchema),
  ctrlWrapper(contactsController.updateContactController)
);

router.put(
  '/:contactId',
  isValidID,
  validateBody(addContactSchema),
  ctrlWrapper(contactsController.updateContactController)
);

router.delete(
  '/:contactId',
  isValidID,
  ctrlWrapper(contactsController.deleteContactController)
);

export default router;




