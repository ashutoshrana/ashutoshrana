import { validationResult } from 'express-validator';

// Shared helper so controllers don't each repeat the validationResult check.
export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};
