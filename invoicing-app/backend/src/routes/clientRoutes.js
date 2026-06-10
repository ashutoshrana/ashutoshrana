import express from 'express';
import { body, param } from 'express-validator';
import * as clientController from '../controllers/clientController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { handleValidation } from '../middleware/validation.js';

const router = express.Router();

router.use(authMiddleware);

router.post(
  '/',
  [body('name').notEmpty().trim(), body('email').isEmail().normalizeEmail()],
  handleValidation,
  clientController.createClient
);

router.get('/', clientController.getAllClients);

router.get('/:id', [param('id').isInt()], handleValidation, clientController.getClientById);

router.put(
  '/:id',
  [param('id').isInt(), body('name').notEmpty().trim(), body('email').isEmail().normalizeEmail()],
  handleValidation,
  clientController.updateClient
);

router.delete('/:id', [param('id').isInt()], handleValidation, clientController.deleteClient);

export default router;
