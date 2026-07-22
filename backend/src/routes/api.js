import { Router } from 'express';
import {
  createRegistrationHandler,
  healthCheckHandler,
} from '../controllers/registrationController.js';

const router = Router();

router.post('/registrations', createRegistrationHandler);
router.get('/health', healthCheckHandler);

export default router;
