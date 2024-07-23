import { Contact } from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContactsFromDB = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

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
