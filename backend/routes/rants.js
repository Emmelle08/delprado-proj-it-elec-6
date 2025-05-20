const express = require('express');
const router = express.Router();
const Rant = require('../models/rant');

// Get all rants for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const rants = await Rant.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.json(rants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single rant by ID
router.get('/:rantId', async (req, res) => {
  try {
    const rant = await Rant.findById(req.params.rantId);
    res.json(rant);
  } catch (err) {
    res.status(404).json({ message: 'Rant not found' });
  }
});

// Add a rant to a post
router.post('/post/:postId', async (req, res) => {
  const rant = new Rant({
    content: req.body.content,
    userId: req.body.userId || 'Anonymous', // optional
    postId: req.params.postId
  });
  try {
    const newRant = await rant.save();
    res.status(201).json(newRant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a reply to a rant
router.post('/:rantId/reply', async (req, res) => {
  try {
    const rant = await Rant.findById(req.params.rantId);
    if (!rant) return res.status(404).json({ message: 'Rant not found' });

    rant.replies.push({
      content: req.body.content,
      userId: req.body.userId || 'Anonymous'
    });
    await rant.save();

    res.status(201).json(rant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;