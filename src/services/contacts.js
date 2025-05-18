import { Contact } from '../models/contactModel.js';

export const getAllContacts = () => Contact.find();

export const getContactById = (id) => Contact.findById(id);

export const createNewContact = (data) => Contact.create(data);

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });

export const deleteContactById = async (id) => {
  const result = await Contact.findByIdAndDelete(id);
  return !!result;
};
