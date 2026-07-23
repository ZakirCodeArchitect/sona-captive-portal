import {
  isValidCnic,
  isValidIpAddress,
  isValidMacAddress,
  isValidPhone,
  normalizeCnic,
  normalizePhone,
} from '../utils/validators.js';

export function validateRegistrationPayload(body) {
  const errors = [];

  const cnic = normalizeCnic(body.cnic);
  const rawPhone = body.phoneNumber ? String(body.phoneNumber).trim() : '';
  const phoneNumber = rawPhone ? normalizePhone(rawPhone) : null;
  const ipAddress = body.ipAddress ? String(body.ipAddress).trim() : null;
  const macAddress = body.macAddress ? String(body.macAddress).trim().toUpperCase() : null;

  if (!cnic || !isValidCnic(cnic)) {
    errors.push({ field: 'cnic', message: 'Invalid CNIC format. Expected 12345-1234567-1.' });
  }

  if (rawPhone && (!phoneNumber || !isValidPhone(phoneNumber))) {
    errors.push({ field: 'phoneNumber', message: 'Invalid Pakistani mobile number. Expected 03XX-XXXXXXX.' });
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
      fullName: '',
      phoneNumber,
      company: '',
      ipAddress,
      macAddress,
    },
  };
}
