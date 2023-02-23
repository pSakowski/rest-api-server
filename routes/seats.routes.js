const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const router = express.Router();

// Get all seats
router.get('/', (req, res) => {
   res.json(db.seats);
});

// Get one seat by ID
router.get('/:id', (req, res, next) => {
   const id = parseInt(req.params.id);
   const seat = db.seats.find((item) => item.id === id);
   if (seat) {
     res.json(seat);
   } else {
     next();
   }
});

// GET random seat
router.get('/random', (req, res) => {
   const id = Math.floor(Math.random() * db.seats.length);
   const randomSeat = db.seats[id];
   res.json(randomSeat);
});

router.post('/', (req, res) => {
  const newSeat = {
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };

  // Check if the selected seat is already occupied
  if (db.seats.some(seat => seat.day === newSeat.day && seat.seat === newSeat.seat)) {
    res.status(409).json({ message: 'Slot is already occupied...' });
  } else {
    // Add the new seat to the array
    db.seats.push(newSeat);

    // Emit the seatsUpdated event with the current content of db.seats
    req.io.emit('seatsUpdated', db.seats);

    res.status(201).json({ message: 'OK' });
  }
});

// Update a seat
router.put('/:id', (req, res) => {
   const id = req.params.id;
   const seat = db.seats.find((item) => item.id === id);
   if (seat) {
     seat.day = req.body.day;
     seat.seat = req.body.seat;
     seat.client = req.body.client;
     seat.email = req.body.email;
     res.json({ message: 'OK' });
   } else {
     res.status(404).json({ message: 'Seat not found' });
   }
});

// Delete a seat
router.delete('/:id', (req, res) => {
   const id = req.params.id;
   const index = db.seats.findIndex((item) => item.id === id);
   if (index !== -1) {
     db.seats.splice(index, 1);
     res.json({ message: 'OK' });
   } else {
     res.status(404).json({ message: 'Seat not found' });
   }
});

module.exports = router;