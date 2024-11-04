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
  tags: [{ type: String }],
  package_price: { type: Number },
  duration: {
    days: { type: Number },
    nights: { type: Number }
  },
  additional_amenities: [{ type: String }],
  site_visits: [{
    location: { type: String },
    duration: { type: String }
  }],
  affordability: { type: String },
  local_cuisine: [{ type: String }],
  safety_tips: [{ type: String }],
  travel_restrictions: [{ type: String }],
  local_attractions: [{
    name: { type: String },
    description: { type: String },
    distance: { type: String }
  }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Export the model
module.exports = mongoose.model('Place', PlaceSchema);
