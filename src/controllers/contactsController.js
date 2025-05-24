import createError from 'http-errors';
import {
  getContacts,
  getContactById,
  createNewContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getAllContactsController(req, res) {
  const pagination = parsePaginationParams(req.query);
  const sorting = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const result = await getContacts({ ...pagination, ...sorting, filter });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: result,
  });
}

export async function getContactByIdController(req, res) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const newContact = await createNewContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
}

export async function updateContactController(req, res) {
  const { contactId } = req.params;
  const updatedContact = await updateContactById(contactId, req.body);

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated a contact!',
    data: updatedContact,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const deleted = await deleteContactById(contactId);

  if (!deleted) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).end();
}

