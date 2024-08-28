import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordShema,
  loginWithGoogleOAuthSchema,
} from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  refreshUsersSessionController,
  logoutUserController,
  requestResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
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
  '/reset-pwd',
  parseJSON,
  validateBody(resetPasswordShema),
  ctrlWrapper(resetPasswordController),
);

router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

router.post(
  '/confirm-oauth',
  parseJSON,
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default router;
