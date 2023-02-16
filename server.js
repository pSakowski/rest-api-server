const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// Testimonials endpoints
// Get all testimonials
app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

// Get one testimonial by ID
app.get('/testimonials/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const testimonial = db.testimonials.find(item => item.id == id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    next();
  }
});

// GET random testimonial
app.get('/testimonials/random', (req, res) => {
  const id = Math.floor(Math.random() * db.testimonials.length);
  const randomTestimonial = db.testimonials[id];
  res.json(randomTestimonial);
});

// Add a new testimonial
app.post('/testimonials', (req, res) => {
  const newTestimonial = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  };
  db.push(newTestimonial);
  res.json({ message: 'OK' });
});

// Update a testimonial
app.put('/testimonials/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const newAuthor = req.body.author;
  const newText = req.body.text;
  const itemIndex = db.testimonials.findIndex(item => item.id == id);
  if (itemIndex !== -1) {
    db[itemIndex].author = newAuthor;
    db[itemIndex].text = newText;
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
app.delete('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const testimonialIndex = db.testimonials.findIndex((item) => item.id === id);
  db.testimonials.splice(testimonialIndex, 1);
  res.json({ message: 'OK' });
});


// Concerts endpoints
// Get all concerts
app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

// Get one concerts by ID
app.get('/concerts/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const concert = db.concerts.find((item) => item.id == id);
  if (concert) {
    res.json(concert);
  } else {
    next();
  }
});

// GET random concerts
app.get('/concerts/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.concerts.length);
  const randomConcert = db.concerts[randomIndex];
  res.json(randomConcert);
});

// Add a new concerts
app.post('/concerts', (req, res) => {
  const newConcert = {
    id: uuid.v4(),
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
app.put('/concerts/:id', (req, res) => {
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
app.delete('/concerts/:id', (req, res) => {
  const id = req.params.id;
  const index = db.concerts.findIndex((item) => item.id === id);
  if (index !== -1) {
    db.concerts.splice(index, 1);
    res.json({ message: 'Concert deleted' });
  } else {
    res.status(404).json({ message: 'Concert not found' });
  }
});


// Seats endpoints
// Get all seats
app.get('/seats', (req, res) => {
  res.json(db.seats);
});

// Get one seat by ID
app.get('/seats/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const seat = db.seats.find((item) => item.id === id);
  if (seat) {
    res.json(seat);
  } else {
    next();
  }
});

// GET random seat
app.get('/seats/random', (req, res) => {
  const id = Math.floor(Math.random() * db.seats.length);
  const randomSeat = db.seats[id];
  res.json(randomSeat);
});

// Add a new seat
app.post('/seats', (req, res) => {
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
app.put('/seats/:id', (req, res) => {
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
app.delete('/seats/:id', (req, res) => {
  const id = req.params.id;
  const index = db.seats.findIndex((item) => item.id === id);
  if (index !== -1) {
    db.seats.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Seat not found' });
  }
});

app.use((req, res) => {
  res.status(404).send('Not found');
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});