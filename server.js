const express = require('express');
const cors = require('cors');
const path = require('path');

const seatsRouter = require('./routes/seats.routes');
const concertsRouter = require('./routes/concerts.routes');
const testimonialsRouter = require('./routes/testimonials.routes');
const notFoundRouter = require('./routes/404.routes');

const app = express();
const port = 8000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use('/api/concerts', concertsRouter);
app.use('/api/seats', seatsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use(notFoundRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});