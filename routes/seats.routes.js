const express = require('express');
const router = express.Router();
const {
  getAllSeats,
  getRandomSeat,
  getSeatById,
  createSeat,
  updateSeat,
  deleteSeat
} = require('../methods/seats.methods');

// Get all seats
router.get('/seats', getAllSeats);

// GET random seat
router.get('/seats/random', getRandomSeat);

// Get one seat by ID
router.get('/seats/:id', getSeatById);

// Create a seat
router.post('/seats', createSeat);

// Update a seat
router.put('/seats/:id', updateSeat);

// Delete a seat and return the deleted document
router.delete('/seats/:id', deleteSeat);

module.exports = router;
