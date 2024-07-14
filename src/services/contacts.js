import { Contact } from '../db/models/Contact.js';

export const getAllContactsFromDB = () => Contact.find();

export const getContactByIdFromDB = (id) => Contact.findById(id);
