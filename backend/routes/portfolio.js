import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET /api/portfolio - Get portfolio data
router.get('/', async (req, res) => {
  try {
    const portfolioPath = path.join(__dirname, '../../data/portfolio.json');
    const data = await fs.readFile(portfolioPath, 'utf-8');
    const portfolio = JSON.parse(data);
    
    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load portfolio data'
    });
  }
});

// GET /api/portfolio/skills - Get skills only
router.get('/skills', async (req, res) => {
  try {
    const portfolioPath = path.join(__dirname, '../../data/portfolio.json');
    const data = await fs.readFile(portfolioPath, 'utf-8');
    const portfolio = JSON.parse(data);
    
    res.json({
      success: true,
      data: portfolio.skills
    });
  } catch (error) {
    console.error('Error reading skills data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load skills data'
    });
  }
});

// GET /api/portfolio/experience - Get experience only
router.get('/experience', async (req, res) => {
  try {
    const portfolioPath = path.join(__dirname, '../../data/portfolio.json');
    const data = await fs.readFile(portfolioPath, 'utf-8');
    const portfolio = JSON.parse(data);
    
    res.json({
      success: true,
      data: portfolio.experience
    });
  } catch (error) {
    console.error('Error reading experience data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load experience data'
    });
  }
});

export default router;
