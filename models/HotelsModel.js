// models/Hotel.js

const mongoose = require('mongoose');

// Schema definition for the Hotel model
const hotelSchema = new mongoose.Schema({
  hotel_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  star_rating: { type: Number, min: 1, max: 5 },
  category: { type: String },

  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    postal_code: { type: String },
    latitude: { type: Number },
    longitude: { type: Number }
  },

  contact: {
    phone: { type: String },
    email: { type: String },
    website: { type: String }
  },

  amenities: [{ type: String }],
  services: [{ type: String }],

  room_types: [
    {
      type: { type: String, required: true },
      price_per_night: { type: Number, required: true },
      features: [{ type: String }]
    }
  ],

  policies: {
    check_in_time: { type: String },
    check_out_time: { type: String },
    cancellation_policy: { type: String },
    pet_policy: { type: String },
    smoking_policy: { type: String }
  },

  pricing: {
    base_price: { type: Number, required: true },
    discounts: [
      {
        description: { type: String },
        amount: { type: Number }
      }
    ],
    availability: { type: Map, of: Number }
  },

  media: {
    photos: [{ type: String }],
    videos: [{ type: String }]
  },

  reviews: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      date: { type: Date, default: Date.now }
    }
  ],

  average_rating: { type: Number, min: 1, max: 5 },
  tags: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Model pre-save middleware to update `updated_at` field
hotelSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// Export the model
module.exports = mongoose.model('Hotel', hotelSchema);
