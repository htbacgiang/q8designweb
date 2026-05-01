import Joi, { ObjectSchema } from "joi";
import { isValidObjectId } from "mongoose";

export const errorMessages = {
  INVALID_TITLE: "Title is missing!",
  INVALID_SLUG: "Slug is missing!",
  INVALID_META: "Meta description is missing!",
  INVALID_CONTENT: "Post content is missing!",
};

export const postValidationSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    "string.empty": errorMessages.INVALID_TITLE,
    "any.required": errorMessages.INVALID_TITLE,
  }),
  content: Joi.string().required().messages({
    "string.empty": errorMessages.INVALID_CONTENT,
    "any.required": errorMessages.INVALID_CONTENT,
  }),
  slug: Joi.string().required().messages({
    "string.empty": errorMessages.INVALID_SLUG,
    "any.required": errorMessages.INVALID_SLUG,
  }),
  meta: Joi.string().required().messages({
    "string.empty": errorMessages.INVALID_META,
    "any.required": errorMessages.INVALID_META,
  }),

});

export const commentValidationSchema = Joi.object().keys({
  belongsTo: Joi.string()
    // .required()
    .custom((value, helper) => {
      if (!isValidObjectId(value)) return helper.error("any.invalid");
      return true;
    })
    .messages({
      "any.invalid": "Post id should be presented as belongsTo!",
      "string.empty": "Invalid belongsTo!",
    }),
  content: Joi.string().required().messages({
    "string.empty": "Content is missing inside comment!",
  }),
});

export const validateSchema = (schema: ObjectSchema, value: any) => {
  const { error } = schema.validate(value, {
    errors: { label: "key", wrap: { label: false, array: false } },
    allowUnknown: true,
  });

  if (error) return error.details[0].message;

  return "";
};

// Validation functions for consultation form
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Remove all non-digit characters except + at the beginning
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  // Check if it's a valid Vietnamese phone number
  // Vietnamese phone numbers: +84xxxxxxxxx or 0xxxxxxxxx
  const phoneRegex = /^(\+84|84|0)[1-9][0-9]{8,9}$/;
  return phoneRegex.test(cleanPhone);
};
