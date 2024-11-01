// models/RepairCenter.js
const mongoose = require('mongoose');

const repairCenterSchema = new mongoose.Schema({
  repair_center_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  nearby_hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }],
  description: { type: String }, // e.g., "Car Repair", "Bike Servicing"
  services_offered: { type: [String], default: [] }, // e.g., ["Oil Change", "Tire Repair"]
  contact: {
    phone_number: { type: String },
    email: { type: String }
  },
  operating_hours: {
    days: { type: [String], default: [] },
    hours: { type: String } // e.g., "9:00 AM - 6:00 PM"
  },
  ratings: {
    average_rating: { type: Number, default: 0 },
    total_reviews: { type: Number, default: 0 }
  },
  emergency_services: { type: Boolean, default: false } // Indicates if emergency services are available
});

module.exports = mongoose.model('RepairCenter', repairCenterSchema);
