import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import * as contactsController from '../controllers/contactsController.js';

const router = Router();

router.get('/', ctrlWrapper(contactsController.getAllContactsController));
router.get('/:contactId', ctrlWrapper(contactsController.getContactByIdController));
router.post('/', ctrlWrapper(contactsController.createContactController));
router.patch('/:contactId', ctrlWrapper(contactsController.updateContactController));
router.delete('/:contactId', ctrlWrapper(contactsController.deleteContactController));

export default router;




