const Seat = require('../models/seat.model');
const { ObjectId } = require('mongodb');
const sanitize = require('mongo-sanitize');

// Get all seats
exports.getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET random seat
exports.getRandomSeat = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomSeat = await Seat.findOne().skip(randomIndex);
    res.json(randomSeat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get one seat by ID
exports.getSeatById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    const seat = await Seat.findById(id);
    if (!seat) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(seat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a seat
exports.createSeat = async (req, res) => {
  const { day, seat, client, email } = sanitize(req.body); // sanitize the request body
  try {
    const newSeat = new Seat({ day, seat, client, email });
    const savedSeat = await newSeat.save();
    req.io.emit('seatsUpdated', savedSeat);
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a seat
exports.updateSeat = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSeat = await Seat.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSeat) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Seat updated', updatedSeat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a seat and return the deleted document
exports.deleteSeat = async (req, res) => {
  const { id } = req.params;
  try {
    const seat = await Seat.findOneAndDelete({ _id: id });
    if (seat) {
      res.json({ message: 'Seat deleted' });
    } else {
      res.status(404).json({ message: 'Seat not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
