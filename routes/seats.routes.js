const express = require('express');
const router = express.Router();
const Seat = require('../models/seat.model');
const { ObjectId } = require('mongodb');

// Get all seats
router.get('/seats', async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET random seat
router.get('/seats/random', async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomSeat = await Seat.findOne().skip(randomIndex);
    res.json(randomSeat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get one seat by ID
router.get('/seats/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    const seat = await Seat.findById(id);
    if (!seat) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(seat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a seat
router.post('/seats', async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const newSeat = new Seat({day, seat, client, email});
    const savedSeat = await newSeat.save();
    req.io.emit('seatsUpdated', savedSeat);
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a seat
router.put('/seats/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSeat = await Seat.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSeat) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Seat updated', updatedSeat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// // Delete a seat and return the deleted document
router.delete('/seats/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSeat = await Seat.findByIdAndDelete(id);
    if (!deletedSeat) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Seat deleted', deletedSeat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;