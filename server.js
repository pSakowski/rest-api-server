const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const concertsRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');
const testimonialsRouter = require('./routes/testimonials.routes');
const notFoundRouter = require('./routes/404.routes');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/build')));

// Add middleware to attach the io instance to the request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API endpoints
app.use('/api/concerts', concertsRouter);
app.use('/api/seats', seatsRouter);
app.use('/api/testimonials', testimonialsRouter);

// Return the main index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.use(notFoundRouter);

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

io.on('connection', (socket) => {
  console.log('New socket!');

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
