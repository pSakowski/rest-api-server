const path = require('path');
const concertsRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');
const testimonialsRouter = require('./routes/testimonials.routes');
const notFoundRouter = require('./routes/404.routes');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// API endpoints
app.use('/api/concerts', concertsRouter);
app.use('/api/seats', seatsRouter);
app.use('/api/testimonials', testimonialsRouter);

// Return the main index.html file for all other routes
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use(notFoundRouter);

// Socket.IO connection listener
io.on('connection', (socket) => {
   console.log('New socket!');
});

// Start the server
server.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
