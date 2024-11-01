// models/PetrolStation.js
const mongoose = require('mongoose');

const petrolStationSchema = new mongoose.Schema({
  station_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  nearby_hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }],
  description: { type: String }, // e.g., "Gas Station", "Electric Charging"
  fuel_types: { type: [String], default: [] }, // e.g., ["Petrol", "Diesel"]
  facilities: { type: [String], default: [] }, // e.g., ["Washroom", "ATM"]
  contact: {
    phone_number: { type: String },
    email: { type: String }
  },
  operating_hours: {
    days: { type: [String], default: [] },
    hours: { type: String } // e.g., "6:00 AM - 10:00 PM"
  },
  ratings: {
    average_rating: { type: Number, default: 0 },
    total_reviews: { type: Number, default: 0 }
  },
  distance_from_hotels: [{
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    distance_km: { type: Number }
  }]
});

module.exports = mongoose.model('PetrolStation', petrolStationSchema);
