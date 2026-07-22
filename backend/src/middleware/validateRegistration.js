import {
  isValidCompany,
  isValidCnic,
  isValidFullName,
  isValidIpAddress,
  isValidMacAddress,
  isValidPhone,
  normalizeCnic,
  normalizePhone,
  sanitizeText,
} from '../utils/validators.js';

export function validateRegistrationPayload(body) {
  const errors = [];

  const cnic = normalizeCnic(body.cnic);
  const phoneNumber = normalizePhone(body.phoneNumber);
  const fullName = sanitizeText(body.fullName, 100);
  const company = sanitizeText(body.company, 150);
  const ipAddress = body.ipAddress ? String(body.ipAddress).trim() : null;
  const macAddress = body.macAddress ? String(body.macAddress).trim().toUpperCase() : null;

  if (!cnic || !isValidCnic(cnic)) {
    errors.push({ field: 'cnic', message: 'Invalid CNIC format. Expected 12345-1234567-1.' });
  }

  if (!isValidFullName(fullName)) {
    errors.push({ field: 'fullName', message: 'Full name must be 2-100 characters and contain valid characters.' });
  }

  if (!phoneNumber || !isValidPhone(phoneNumber)) {
    errors.push({ field: 'phoneNumber', message: 'Invalid Pakistani mobile number. Expected 03XX-XXXXXXX.' });
  }

  if (!isValidCompany(company)) {
    errors.push({ field: 'company', message: 'Company name must be 2-150 characters.' });
  }

  if (!isValidIpAddress(ipAddress)) {
    errors.push({ field: 'ipAddress', message: 'Invalid IP address format.' });
  }

  if (!isValidMacAddress(macAddress)) {
    errors.push({ field: 'macAddress', message: 'Invalid MAC address format.' });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      cnic,
      fullName,
      phoneNumber,
      company,
      ipAddress,
      macAddress,
    },
  };
}
