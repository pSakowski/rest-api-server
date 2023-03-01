const mongoose = require('mongoose');
const socket = require('socket.io');
const express = require('express');
const cors = require('cors');
const path = require('path');
const concertsRouter = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRouter = require('./routes/testimonials.routes');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Pass the `io` object to the request object for use in route handlers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API endpoints
app.use('/api', concertsRouter);
app.use('/api', seatsRoutes);
app.use('/api', testimonialsRouter);

// Return the main index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

mongoose.connect('mongodb+srv://pees:Pees1@cluster0.hawsg2s.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port: 3000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});