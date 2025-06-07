import mongoose from "mongoose";
import { Schema } from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      default: null,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ["work", "home", "personal"],
      required: true,
      default: "personal",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Contact = mongoose.model("Contact", contactSchema, "contacts");
