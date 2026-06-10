import express from 'express';
import { body, param } from 'express-validator';
import * as invoiceController from '../controllers/invoiceController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { handleValidation } from '../middleware/validation.js';

const router = express.Router();

router.use(authMiddleware);

router.post(
  '/',
  [body('clientId').isInt(), body('issueDate').isISO8601(), body('dueDate').isISO8601()],
  handleValidation,
  invoiceController.createInvoice
);

router.get('/', invoiceController.getAllInvoices);

router.get('/:id', [param('id').isInt()], handleValidation, invoiceController.getInvoiceById);

router.put('/:id', [param('id').isInt()], handleValidation, invoiceController.updateInvoice);

router.patch(
  '/:id/status',
  [param('id').isInt(), body('status').isIn(['draft', 'sent', 'paid', 'overdue'])],
  handleValidation,
  invoiceController.updateInvoiceStatus
);

router.post(
  '/:id/items',
  [
    param('id').isInt(),
    body('description').notEmpty().trim(),
    body('quantity').isFloat({ min: 0 }),
    body('unitPrice').isFloat({ min: 0 }),
  ],
  handleValidation,
  invoiceController.addInvoiceItem
);

router.delete(
  '/:invoiceId/items/:itemId',
  [param('invoiceId').isInt(), param('itemId').isInt()],
  handleValidation,
  invoiceController.deleteInvoiceItem
);

router.delete('/:id', [param('id').isInt()], handleValidation, invoiceController.deleteInvoice);

export default router;
