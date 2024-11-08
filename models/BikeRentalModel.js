// models/BikeRental.js
const mongoose = require('mongoose');

const bikeRentalSchema = new mongoose.Schema({
  bike_rental_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  rentalId: { type: String, required: true },
  locationName: { type: String, required: true },
  locations: {
    village: String,
    city: String,
    state: String,
  },
  description: { type: String },
  vehicle_types: { type: [String], default: [] }, // e.g., ["Mountain Bike", "Scooter"]
  pricing: {
    price_per_hour: { type: Number },
    price_per_day: { type: Number },
    currency: { type: String, default: 'INR' }
  },
  availability: {
    days: { type: [String], default: [] }, // e.g., ["Monday", "Tuesday"]
    hours: { type: String } // e.g., "9:00 AM - 6:00 PM"
  },
  contact: {
    phone_number: { type: String },
    email: { type: String }
  },
  ratings: {
    average_rating: { type: Number, default: 0 },
    total_reviews: { type: Number, default: 0 }
  },
  amenities: { type: [String], default: [] } // e.g., ["Helmet", "Insurance"]
});

module.exports = mongoose.model('BikeRental', bikeRentalSchema);
