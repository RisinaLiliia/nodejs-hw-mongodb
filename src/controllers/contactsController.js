import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createNewContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';


export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};


export const getContactByIdController = async (req, res) => {
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
};


export const createContactController = async (req, res) => {
  const newContact = await createNewContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};


export const updateContactController = async (req, res) => {
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
};


export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const deleted = await deleteContactById(contactId);
  if (!deleted) {
    throw createError(404, 'Contact not found');
  }
  res.status(204).end();
};
