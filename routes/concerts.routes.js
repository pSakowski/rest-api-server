const express = require('express');
const router = express.Router();
const { 
  getAllConcerts,
  getRandomConcert,
  getConcertById,
  addNewConcert,
  updateConcert,
  deleteConcert 
} = require('../methods/concerts.methods');

// Get all concerts
router.get('/concerts', getAllConcerts);

// GET random concerts
router.get('/concerts/random', getRandomConcert);

// Get one concert by ID
router.get('/concerts/:id', getConcertById);

// Add a new concerts
router.post('/concerts', addNewConcert);

// Update a seat
router.put('/concerts/:id', updateConcert);

// Delete a concert
router.delete('/concerts/:id', deleteConcert);

module.exports = router;
