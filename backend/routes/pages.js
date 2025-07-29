const express = require('express');
const Page = require('../models/Page');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all pages
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find().populate('createdBy', 'name email role');
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get page by id
router.get('/:id', async (req, res) => {
  try {
    const page = await Page.findById(req.params.id).populate('createdBy', 'name email role');
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update page (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { id, title, content, mediaUrl } = req.body;
  try {
    let page;
    if (id) {
      page = await Page.findById(id);
      if (!page) return res.status(404).json({ message: 'Page not found' });
      page.title = title;
      page.content = content;
      page.mediaUrl = mediaUrl;
      await page.save();
    } else {
      page = new Page({
        title,
        content,
        mediaUrl,
        createdBy: req.user.id
      });
      await page.save();
    }
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
