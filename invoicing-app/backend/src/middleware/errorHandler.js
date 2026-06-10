import logger from '../utils/logger.js';

// Centralised error handler. Mounted last in server.js.
export const errorHandler = (err, req, res, _next) => {
  logger.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
};
