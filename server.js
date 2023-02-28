const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const concertsRouter = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRouter = require('./routes/testimonials.routes');
// const notFoundRouter = require('./routes/404.routes');

const port = process.env.PORT || 8000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/build')));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

// API endpoints
app.use('/api/concerts', concertsRouter);
app.use('/api/seats', seatsRoutes);
app.use('/api/testimonials', testimonialsRouter);

// Return the main index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

// app.use(notFoundRouter);

mongoose.connect('mongodb://localhost:27017/companyDB', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

console.log('Database connection successful');

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});