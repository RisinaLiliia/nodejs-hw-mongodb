import Contact from '../models/contactModel.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};
