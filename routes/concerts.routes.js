const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const router = express.Router();

// Get all concerts
router.get('/', (req, res) => {
   res.json(db.concerts);
});

// Get one concerts by ID
router.get('/:id', (req, res, next) => {
   const id = parseInt(req.params.id);
   const concert = db.concerts.find((item) => item.id == id);
   if (concert) {
     res.json(concert);
   } else {
     next();
   }
});

// GET random concerts
router.get('/random', (req, res) => {
   const randomIndex = Math.floor(Math.random() * db.concerts.length);
   const randomConcert = db.concerts[randomIndex];
   res.json(randomConcert);
});

// Add a new concerts
router.post('/', (req, res) => {
   const newConcert = {
     id: uuidv4(),
     performer: req.body.performer,
     genre: req.body.genre,
     price: req.body.price,
     day: req.body.day,
     image: req.body.image,
   };
   db.concerts.push(newConcert);
   res.json(newConcert);
});

// Update a concerts
router.put('/:id', (req, res) => {
   const id = req.params.id;
   const concert = db.concerts.find((item) => item.id === id);
   if (concert) {
     concert.performer = req.body.performer;
     concert.genre = req.body.genre;
     concert.price = req.body.price;
     concert.day = req.body.day;
     concert.image = req.body.image;
     res.json(concert);
   } else {
     res.status(404).json({ message: 'Concert not found' });
   }
});

// Delete a concerts
router.delete('/:id', (req, res) => {
   const id = req.params.id;
   const index = db.concerts.findIndex((item) => item.id === id);
   if (index !== -1) {
     db.concerts.splice(index, 1);
     res.json({ message: 'Concert deleted' });
   } else {
     res.status(404).json({ message: 'Concert not found' });
   }
});

module.exports = router;