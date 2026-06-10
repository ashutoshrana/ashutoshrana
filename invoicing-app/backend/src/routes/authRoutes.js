import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { handleValidation } from '../middleware/validation.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('firstName').notEmpty().trim(),
    body('lastName').notEmpty().trim(),
  ],
  handleValidation,
  authController.register
);

router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').notEmpty()],
  handleValidation,
  authController.login
);

router.get('/profile', authMiddleware, authController.getProfile);

router.put(
  '/profile',
  authMiddleware,
  [body('firstName').notEmpty().trim(), body('lastName').notEmpty().trim()],
  handleValidation,
  authController.updateProfile
);

router.post(
  '/change-password',
  authMiddleware,
  [body('oldPassword').notEmpty(), body('newPassword').isLength({ min: 8 })],
  handleValidation,
  authController.changePassword
);

export default router;
