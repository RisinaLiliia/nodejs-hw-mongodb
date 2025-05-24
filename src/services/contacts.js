import { Contact } from '../models/contactModel.js';

export async function getContacts({ page, perPage, sortBy, sortOrder, filter }) {
  const skip = (page - 1) * perPage;
  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const [totalItems, data] = await Promise.all([
    Contact.countDocuments(filter),
    Contact.find(filter).sort(sort).skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
}

export const getContactById = (id) => Contact.findById(id);
export const createNewContact = (data) => Contact.create(data);
export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });
export const deleteContactById = (id) => Contact.findByIdAndDelete(id);

