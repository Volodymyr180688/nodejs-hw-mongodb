import { Contact } from '../db/models/Contact.js';

export const getAllContactsFromDB = () => Contact.find();

export const getContactByIdFromDB = (contactId) => Contact.findById(contactId);

export const createContact = (contactData) => Contact.create(contactData);

export const deleteContact = (contactId) =>
  Contact.findOneAndDelete({ _id: contactId });

export const updateContact = (
  contactId,
  payload,
  options = {
    upsert: true,
  },
) =>
  Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    payload,
    {
      new: true,
      ...options,
    },
  );
