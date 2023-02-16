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

// Add a new seat
router.post('/', (req, res) => {
   const newSeat = {
     id: uuidv4(),
     day: req.body.day,
     seat: req.body.seat,
     client: req.body.client,
     email: req.body.email,
   };
   db.seats.push(newSeat);
   res.json({ message: 'OK' });
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