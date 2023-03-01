const express = require('express');
const router = express.Router();
const testimonialMethods = require('../methods/testimonials.methods');

// Get all testimonials
router.get('/testimonials', testimonialMethods.getAllTestimonials);

// GET random testimonials
router.get('/testimonials/random', testimonialMethods.getRandomTestimonial);

// Get one testimonial by ID
router.get('/testimonials/:id', testimonialMethods.getTestimonialById);

// Add a new testimonial
router.post('/testimonials', testimonialMethods.addTestimonial);

// Update a testimonial
router.put('/testimonials/:id', testimonialMethods.updateTestimonial);

// Delete a testimonial
router.delete('/testimonials/:id', testimonialMethods.deleteTestimonial);

module.exports = router;