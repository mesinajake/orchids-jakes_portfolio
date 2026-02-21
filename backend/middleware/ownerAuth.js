import { OwnerSession } from '../models/schemas.js';
import { hashSessionToken } from '../utils/ownerSession.js';

function parseBearerToken(authorizationHeader) {
  if (!authorizationHeader || typeof authorizationHeader !== 'string') return null;
  const [scheme, token] = authorizationHeader.split(' ');
  if (scheme !== 'Bearer' || !token) return null;
  return token.trim();
}

export default async function ownerAuth(req, res, next) {
  try {
    const token = parseBearerToken(req.headers.authorization);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: missing owner token'
      });
    }

    const tokenHash = hashSessionToken(token);
    const session = await OwnerSession.findOne({
      tokenHash,
      expiresAt: { $gt: new Date() }
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: invalid or expired owner session'
      });
    }

    session.lastUsedAt = new Date();
    await session.save();

    req.ownerSession = session;
    req.ownerTokenHash = tokenHash;
    next();
  } catch (error) {
    console.error('Owner auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate owner session'
    });
  }
}
