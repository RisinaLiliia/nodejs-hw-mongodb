import createHttpError from "http-errors";
import { Contact } from "../models/contactModel.js";
import { ROLES } from "../constants/index.js";

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    try {
      const { user } = req;
      if (!user) {
        return next(createHttpError(401));
      }

      const { role } = user;

      if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
        return next();
      }

      if (roles.includes(ROLES.USER) && role === ROLES.USER) {
        const { contactId } = req.params;
        if (!contactId) {
          return next(createHttpError(403, "Contact ID is required"));
        }

        const contact = await Contact.findById(contactId);
        if (!contact || !contact.userId.equals(user._id)) {
          return next(createHttpError(403, "Access denied"));
        }

        return next();
      }

      return next(createHttpError(403));
    } catch (error) {
      next(error);
    }
  };
