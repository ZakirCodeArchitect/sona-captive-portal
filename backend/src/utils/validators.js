const CNIC_REGEX = /^\d{5}-\d{7}-\d$/;
const PHONE_REGEX = /^03\d{2}-\d{7}$/;
const MAC_REGEX = /^([0-9A-F]{2}:){5}[0-9A-F]{2}$/i;
const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
const IPV6_REGEX = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

export function normalizeCnic(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.length !== 13) return null;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
}

export function normalizePhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.length !== 11 || !digits.startsWith('03')) return null;
  return `${digits.slice(0, 4)}-${digits.slice(4)}`;
}

export function isValidCnic(value) {
  return CNIC_REGEX.test(value);
}

export function isValidPhone(value) {
  return PHONE_REGEX.test(value);
}

export function isValidFullName(value) {
  const trimmed = String(value || '').trim();
  return trimmed.length >= 2 && trimmed.length <= 100 && /^[\p{L}\s.'-]+$/u.test(trimmed);
}

export function isValidCompany(value) {
  const trimmed = String(value || '').trim();
  return trimmed.length >= 2 && trimmed.length <= 150;
}

export function isValidIpAddress(value) {
  if (!value) return true;
  return IPV4_REGEX.test(value) || IPV6_REGEX.test(value);
}

export function isValidMacAddress(value) {
  if (!value) return true;
  return MAC_REGEX.test(value);
}

export function sanitizeText(value, maxLength) {
  return String(value || '')
    .trim()
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .slice(0, maxLength);
}

export function maskCnic(cnic) {
  if (!cnic || cnic.length < 8) return '***';
  return `${cnic.slice(0, 2)}***${cnic.slice(-2)}`;
}
