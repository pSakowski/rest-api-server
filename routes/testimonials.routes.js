const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonial.model');
const { ObjectId } = require('mongodb');

const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Get all testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET random testimonials
router.get('/testimonials/random', async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomTestimonial = await Testimonial.findOne().skip(randomIndex);
    res.json(randomTestimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get one testimonial by ID
router.get('/testimonials/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(testimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new testimonial
router.post('/testimonials', async (req, res) => {
  const { author, text } = req.body;
  try {
    const newTestimonial = new Testimonial({author, text});
    const savedTestimonial = await newTestimonial.save();
    req.io.emit('testimonialUpdated', savedTestimonial);
    const testimonial = await Testimonial.find();
    res.json(testimonial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a testimonial
router.put('/testimonials/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Testimonial updated', updatedTestimonial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a testimonial
router.delete('/testimonials/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Testimonial deleted', deletedTestimonial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;