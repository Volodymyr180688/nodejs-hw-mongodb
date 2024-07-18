import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactByIdController,
  patchContactByIdController,
} from '../controllers/contacts.js';

const contactsRouter = express.Router();
const jsonParser = express.json();
contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post('/', jsonParser, ctrlWrapper(createContactController));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

contactsRouter.patch(
  '/:contactId',
  jsonParser,
  ctrlWrapper(patchContactByIdController),
);
export default contactsRouter;
