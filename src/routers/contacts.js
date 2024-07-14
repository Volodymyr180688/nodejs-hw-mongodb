import { Router } from 'express';
import { controlWrapper } from '../utils/controlWrapper.js';
import { getAllContacts, getContactById } from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', controlWrapper(getAllContacts));

contactsRouter.get('/:contactId', controlWrapper(getContactById));

export default contactsRouter;
