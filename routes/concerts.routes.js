const express = require('express');
const router = express.Router();
const { 
  getAllConcerts,
  getRandomConcert,
  getConcertById,
  addNewConcert,
  updateConcert,
  deleteConcert,
  getConcertsByPerformer,
  getConcertsByGenre,
  getConcertsByPriceRange,
  getConcertsByDay,

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

// Get concerts by performer
router.get('/concerts/performer/:performer', getConcertsByPerformer);

// Get concerts by genre
router.get('/concerts/genre/:genre', getConcertsByGenre);

// Get concerts by price range
router.get('/concerts/price/:price_min/:price_max', getConcertsByPriceRange);

// Get concerts by day
router.get('/concerts/day/:day', getConcertsByDay);

module.exports = router;
