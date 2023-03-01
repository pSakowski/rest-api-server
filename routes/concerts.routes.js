const express = require('express');
const router = express.Router();
const Concert = require('../models/concert.model');
const { ObjectId } = require('mongodb');

// Get all concerts
router.get('/concerts', async (req, res) => {
  try {
    const concerts = await Concert.find();
    res.json(concerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET random concerts
router.get('/concerts/random', async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomConcert = await Concert.findOne().skip(randomIndex);
    res.json(randomConcert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get one concert by ID
router.get('/concerts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    const concert = await Concert.findById(id);
    if (!concert) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(concert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new concerts
router.post('/concerts', async (req, res) => {
  const { id, performer, genre, price, day, image } = req.body;
  try {
    const newConcert = new Concert({id, performer, genre, price, day, image});
    const savedConcert = await newConcert.save();
    req.io.emit('concertsUpdated', savedConcert);
    const concerts = await Concert.find();
    res.json(concerts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Update a seat
router.put('/concerts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedConcert = await Concert.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedConcert) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Concert updated', updatedConcert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a concert
router.delete('/concerts/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const concert = await Concert.findOneAndDelete({ id });
    if (concert) {
      res.json({ message: 'Concert deleted' });
    } else {
      res.status(404).json({ message: 'Concert not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
