const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Get all testimonials
router.get('/', (req, res) => {
   res.json(db.testimonials);
});

// Get one testimonial by ID
router.get('/:id', (req, res, next) => {
   const id = parseInt(req.params.id);
   const testimonial = db.testimonials.find(item => item.id == id);
   if (testimonial) {
     res.json(testimonial);
   } else {
     next();
   }
});

// GET random testimonial
router.get('/random', (req, res) => {
   const id = Math.floor(Math.random() * db.testimonials.length);
   const randomTestimonial = db.testimonials[id];
   res.json(randomTestimonial);
});

// Add a new testimonial
router.post('/', (req, res) => {
   const newTestimonial = {
     id: uuidv4(),
     author: req.body.author,
     text: req.body.text,
   };
   db.testimonials.push(newTestimonial);
   res.json({ message: 'OK' });
});

// Update a testimonial
router.put('/:id', (req, res, next) => {
   const id = parseInt(req.params.id);
   const newAuthor = req.body.author;
   const newText = req.body.text;
   const itemIndex = db.testimonials.findIndex(item => item.id == id);
   if (itemIndex !== -1) {
     db.testimonials[itemIndex].author = newAuthor;
     db.testimonials[itemIndex].text = newText;
     res.json({ message: 'OK' });
   } else {
     next();
   }
}, (error, req, res, next) => {
   if (error) {
     res.status(500).json({ error: error.message });
   }
});

// Delete a testimonial
router.delete('/:id', (req, res) => {
   const id = parseInt(req.params.id);
   const testimonialIndex = db.testimonials.findIndex((item) => item.id === id);
   db.testimonials.splice(testimonialIndex, 1);
   res.json({ message: 'OK' });
});

module.exports = router;