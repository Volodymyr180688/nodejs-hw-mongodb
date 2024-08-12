import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordShema,
} from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  refreshUsersSessionController,
  logoutUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();
const parseJSON = express.json();

router.post(
  '/register',
  parseJSON,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  parseJSON,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', parseJSON, ctrlWrapper(logoutUserController));

router.post('/refresh', parseJSON, ctrlWrapper(refreshUsersSessionController));

router.post(
  '/send-reset-email',
  parseJSON,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-password',
  parseJSON,
  validateBody(resetPasswordShema),
  ctrlWrapper(resetPasswordController),
);

export default router;
