const CNIC_REGEX = /^\d{5}-\d{7}-\d$/;
const PHONE_REGEX = /^03\d{2}-\d{7}$/;

export function validateCnic(value) {
  if (!value) return 'CNIC is required.';
  if (!CNIC_REGEX.test(value)) return 'Enter a valid CNIC (e.g. 12345-1234567-1).';
  return true;
}

export function validatePhone(value) {
  if (!value) return 'Phone number is required.';
  if (!PHONE_REGEX.test(value)) return 'Enter a valid Pakistani mobile number (03XX-XXXXXXX).';
  return true;
}

export function validateFullName(value) {
  if (!value?.trim()) return 'Full name is required.';
  if (value.trim().length < 2) return 'Full name must be at least 2 characters.';
  if (value.trim().length > 100) return 'Full name must not exceed 100 characters.';
  if (!/^[\p{L}\s.'-]+$/u.test(value.trim())) return 'Full name contains invalid characters.';
  return true;
}

export function validateCompany(value) {
  if (!value?.trim()) return 'Company name is required.';
  if (value.trim().length < 2) return 'Company name must be at least 2 characters.';
  if (value.trim().length > 150) return 'Company name must not exceed 150 characters.';
  return true;
}

export function validateTerms(value) {
  return value === true || 'You must agree to the Terms & Conditions.';
}
