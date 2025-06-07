import createError from "http-errors";
import {
  getContacts,
  getContactById,
  createNewContact,
  updateContactById,
  deleteContactById,
} from "../services/contacts.js";

import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { ROLES } from "../constants/index.js";

import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { getEnvVar } from "../utils/getEnvVar.js";

export const getAllContactsController = async (req, res) => {
  const pagination = parsePaginationParams(req.query);
  const sorting = parseSortParams(req.query);
  const filter = {
    ...parseFilterParams(req.query),
  };

  if (req.user.role !== ROLES.ADMIN) {
    filter.userId = req.user._id;
  }

  const result = await getContacts({ ...pagination, ...sorting, filter });

  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: result,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user.role === ROLES.ADMIN ? null : req.user._id;

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createError(404, "Contact not found");
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  try {
    const photo = req.file;
    let photoUrl = null;

    if (photo) {
      if (getEnvVar("ENABLE_CLOUDINARY") === "true") {
        photoUrl = await saveFileToCloudinary(photo);
      }
    }

    const newContact = await createNewContact({
      ...req.body,
      userId: req.user._id,
      photo: photoUrl,
    });

    res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user.role === ROLES.ADMIN ? null : req.user._id;
    const photo = req.file;
    let photoUrl;

    if (photo) {
      if (getEnvVar("ENABLE_CLOUDINARY") === "true") {
        photoUrl = await saveFileToCloudinary(photo);
      }
    }

    const updateData = {
      ...req.body,
    };

    if (photoUrl) {
      updateData.photo = photoUrl;
    }

    const updatedContact = await updateContactById(
      contactId,
      updateData,
      userId
    );

    if (!updatedContact) {
      throw createError(404, "Contact not found");
    }

    res.status(200).json({
      status: 200,
      message: "Successfully updated a contact!",
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user.role === ROLES.ADMIN ? null : req.user._id;

  const deleted = await deleteContactById(contactId, userId);

  if (!deleted) {
    throw createError(404, "Contact not found");
  }

  res.status(204).end();
};
