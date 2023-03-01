const Testimonial = require('../models/testimonial.model');
const { ObjectId } = require('mongodb');

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET random testimonials
exports.getRandomTestimonial = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomTestimonial = await Testimonial.findOne().skip(randomIndex);
    res.json(randomTestimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get one testimonial by ID
exports.getTestimonialById = async (req, res) => {
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
};

// Add a new testimonial
exports.addTestimonial = async (req, res) => {
  const { author, text } = req.body;
  try {
    const newTestimonial = new Testimonial({ author, text });
    const savedTestimonial = await newTestimonial.save();
    req.io.emit('testimonialUpdated', savedTestimonial);
    const testimonial = await Testimonial.find();
    res.json(testimonial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a testimonial
exports.updateTestimonial = async (req, res) => {
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
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
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
};
