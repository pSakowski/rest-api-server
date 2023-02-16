const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Get all testimonials
app.get('/testimonials', (req, res) => {
  res.json(db);
});

// Get one testimonial by ID
app.get('/testimonials/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const testimonial = db.find(testimonials => testimonials.id == id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    next();
  }
});

// GET random testimonial
app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  const randomItem = db[randomIndex];
  res.json(randomItem);
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

  const itemIndex = db.findIndex(item => item.id == id);
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
  const testimonialIndex = db.findIndex((item) => item.id === id);
  db.splice(testimonialIndex, 1);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).send('Not found');
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});