const CNIC_REGEX = /^\d{5}-\d{7}-\d$/;
const PHONE_REGEX = /^03\d{2}-\d{7}$/;

export function validateCnic(value) {
  if (!value) return 'CNIC is required.';
  if (!CNIC_REGEX.test(value)) return 'Enter a valid CNIC (e.g. 12345-1234567-1).';
  return true;
}

export function validatePhone(value) {
  if (!value) return true;
  if (!PHONE_REGEX.test(value)) return 'Enter a valid Pakistani mobile number (03XX-XXXXXXX).';
  return true;
}

export function validateTerms(value) {
  return value === true || 'You must agree to the Terms & Conditions.';
}
