const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  place_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  location: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postal_code: { type: String },
    latitude: { type: Number },
    longitude: { type: Number }
  },
  contact: {
    phone: { type: String },
    email: { type: String },
    website: { type: String }
  },
  opening_hours: { type: Object },
  entry_fee: { type: String },
  amenities: [{ type: String }],
  best_time_to_visit: { type: String },
  nearby_hotels: [{ type: String }],
  activities: [{ type: String }],
  media: {
    photos: [{ type: String }],
    videos: [{ type: String }]
  },
  reviews: [
    {
      user_id: { type: String },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      date: { type: Date }
    }
  ],
  average_rating: { type: Number, default: 0 },
  tags: [{ type: String }]
});

module.exports = mongoose.model('Place', PlaceSchema);
