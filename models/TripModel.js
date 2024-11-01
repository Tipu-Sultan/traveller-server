// models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  numPeople: { type: Number, required: true },
  totalCost: Number,
});

module.exports = mongoose.model('Trip', tripSchema);
