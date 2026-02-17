import express from 'express';
import { body, validationResult } from 'express-validator';
import { Contact } from '../models/schemas.js';
import nodemailer from 'nodemailer';

const router = express.Router();

const hasEmailConfig = [
  process.env.EMAIL_HOST,
  process.env.EMAIL_PORT,
  process.env.EMAIL_USER,
  process.env.EMAIL_PASSWORD,
  process.env.EMAIL_TO,
].every(Boolean);

const transporter = hasEmailConfig
  ? nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  : null;

// Validation middleware
const validateContact = [
  body('name').trim().isLength({ min: 2, max: 100 }).escape(),
  body('email').trim().isEmail().normalizeEmail(),
  body('message').trim().isLength({ min: 10, max: 1000 }).escape(),
];

// POST /api/contact - Handle contact form submission
router.post('/', validateContact, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    // Save to database
    const contact = new Contact({
      name,
      email,
      message,
      userAgent: req.get('user-agent'),
      ipAddress: req.ip,
    });

    await contact.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Received at: ${new Date().toLocaleString()}</small></p>
      `,
    };

    if (transporter) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn('Email not configured; skipping outbound notification email.');
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
});

// GET /api/contact - Get all contacts (admin only - add authentication later)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);
    res.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

export default router;
