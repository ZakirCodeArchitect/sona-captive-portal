import { validateRegistrationPayload } from '../middleware/validateRegistration.js';
import { AppError } from '../middleware/errorHandler.js';
import {
  checkDatabaseHealth,
  createRegistration,
  findDuplicateToday,
} from '../services/registrationService.js';
import logger from '../utils/logger.js';
import { maskCnic } from '../utils/validators.js';

function extractClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || null;
}

export async function createRegistrationHandler(req, res, next) {
  try {
    const validation = validateRegistrationPayload(req.body);

    if (!validation.valid) {
      throw new AppError('Invalid input.', 400, 'VALIDATION_ERROR', validation.errors);
    }

    const { data } = validation;

    const ipAddress = data.ipAddress || extractClientIp(req);
    const macAddress = data.macAddress || req.query.mac || null;

    const duplicate = await findDuplicateToday(data.cnic);
    if (duplicate) {
      throw new AppError(
        'This CNIC has already been registered today.',
        409,
        'DUPLICATE_REGISTRATION',
      );
    }

    const record = await createRegistration({
      ...data,
      ipAddress,
      macAddress,
    });

    logger.info('Registration created', {
      visitorId: record.VisitorID,
      cnic: maskCnic(data.cnic),
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful. You may now access the internet.',
      data: {
        visitorId: record.VisitorID,
        registrationTime: record.RegistrationTime,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function healthCheckHandler(req, res, next) {
  try {
    const dbHealthy = await checkDatabaseHealth();

    res.status(dbHealthy ? 200 : 503).json({
      success: dbHealthy,
      status: dbHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealthy ? 'up' : 'down',
      },
    });
  } catch (error) {
    next(error);
  }
}
