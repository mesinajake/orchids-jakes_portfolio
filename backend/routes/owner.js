import express from 'express';
import { body, validationResult } from 'express-validator';
import { OwnerSession } from '../models/schemas.js';
import ownerAuth from '../middleware/ownerAuth.js';
import {
  generateSessionToken,
  getSessionExpiryDate,
  hashSessionToken,
  isPasskeyValid
} from '../utils/ownerSession.js';

const router = express.Router();

const validateLogin = [
  body('passkey').isString().trim().isLength({ min: 1, max: 256 })
];

router.post('/login', validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    if (!process.env.OWNER_PASSKEY) {
      return res.status(500).json({
        success: false,
        message: 'Owner login is not configured on the server'
      });
    }

    const { passkey } = req.body;
    if (!isPasskeyValid(passkey)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid owner credentials'
      });
    }

    const token = generateSessionToken();
    const expiresAt = getSessionExpiryDate();

    await OwnerSession.deleteMany({ expiresAt: { $lte: new Date() } });
    await OwnerSession.create({
      tokenHash: hashSessionToken(token),
      expiresAt,
      lastUsedAt: new Date()
    });

    res.json({
      success: true,
      token,
      expiresAt
    });
  } catch (error) {
    console.error('Owner login error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete owner login'
    });
  }
});

router.get('/me', ownerAuth, async (req, res) => {
  res.json({
    authenticated: true,
    expiresAt: req.ownerSession.expiresAt
  });
});

router.post('/logout', ownerAuth, async (req, res) => {
  try {
    await OwnerSession.deleteOne({ tokenHash: req.ownerTokenHash });
    res.json({
      success: true
    });
  } catch (error) {
    console.error('Owner logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to logout owner session'
    });
  }
});

export default router;
