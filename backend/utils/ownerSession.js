import crypto from 'crypto';

const DEFAULT_SESSION_HOURS = 168;

export function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function hashSessionToken(token) {
  return crypto.createHash('sha256').update(token || '').digest('hex');
}

function hashForCompare(value) {
  return crypto.createHash('sha256').update(value || '').digest();
}

export function isPasskeyValid(passkey) {
  const expectedPasskey = process.env.OWNER_PASSKEY || '';
  if (!expectedPasskey) return false;

  const providedHash = hashForCompare(passkey);
  const expectedHash = hashForCompare(expectedPasskey);
  return crypto.timingSafeEqual(providedHash, expectedHash);
}

export function getSessionExpiryDate() {
  const ttlHours = Number(process.env.OWNER_SESSION_TTL_HOURS) || DEFAULT_SESSION_HOURS;
  return new Date(Date.now() + ttlHours * 60 * 60 * 1000);
}
