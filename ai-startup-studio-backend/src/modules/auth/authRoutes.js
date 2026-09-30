import { Router } from 'express';

import { validateBody } from '../../middleware/validate.js';
import { requireAuth } from '../../middleware/authMiddleware.js';

import {
  loginSchema,
  registerSchema
} from './authSchemas.js';

import {
  login,
  logout,
  me,
  refresh,
  register
} from './authController.js';

const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', requireAuth, me);

export default router;