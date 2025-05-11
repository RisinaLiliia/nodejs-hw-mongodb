import { Router } from 'express';
import { handleGetAllContacts, getContactByIdController } from '../controllers/contactsController.js';

const router = Router();

router.get('/', handleGetAllContacts);

router.get('/:contactId', getContactByIdController);

export default router;
