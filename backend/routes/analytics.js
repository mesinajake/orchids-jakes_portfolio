import express from 'express';
import { Analytics } from '../models/schemas.js';

const router = express.Router();

// POST /api/analytics - Track analytics event
router.post('/', async (req, res) => {
  try {
    const { type, page, element, sessionId, metadata } = req.body;

    const analytics = new Analytics({
      type,
      page,
      element,
      sessionId,
      metadata,
      userAgent: req.get('user-agent'),
      ipAddress: req.ip,
    });

    await analytics.save();

    res.status(201).json({
      success: true,
      message: 'Event tracked successfully'
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track event'
    });
  }
});

// GET /api/analytics/summary - Get analytics summary (admin only - add auth later)
router.get('/summary', async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const analytics = await Analytics.find({
      timestamp: { $gte: startDate }
    });

    // Calculate statistics
    const stats = {
      totalEvents: analytics.length,
      pageViews: analytics.filter(a => a.type === 'page_view').length,
      chatInteractions: analytics.filter(a => a.type === 'chat_interaction').length,
      contactFormSubmissions: analytics.filter(a => a.type === 'contact_form').length,
      downloads: analytics.filter(a => a.type === 'download').length,
      popularPages: {},
    };

    // Count page views by page
    analytics.forEach(event => {
      if (event.type === 'page_view' && event.page) {
        stats.popularPages[event.page] = (stats.popularPages[event.page] || 0) + 1;
      }
    });

    res.json({
      success: true,
      period: `Last ${days} days`,
      stats
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics'
    });
  }
});

export default router;
