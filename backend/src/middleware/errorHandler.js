import logger from '../utils/logger.js';

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: 'NOT_FOUND',
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
}

export function errorHandler(err, req, res, _next) {
  logger.error('Unhandled error', {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.code || 'REQUEST_ERROR',
      message: err.message,
      details: err.details || [],
    });
  }

  res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred. Please try again later.',
  });
}

export class AppError extends Error {
  constructor(message, statusCode = 400, code = 'REQUEST_ERROR', details = []) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}
