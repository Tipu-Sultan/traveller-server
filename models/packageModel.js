const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  packageId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  locations: {
    village: String,
    city: String,
    state: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  category: {
    type: String,
    enum: ['Adventure', 'Historical', 'Beach', 'Wildlife', 'Cultural', 'Religious', 'Luxury', 'Nature', 'Urban'],
    required: true
  },
  itinerary: [
    {
      day: Number,
      activities: [String],
      highlights: String
    }
  ],
  amenities: [String],
  hotels: [
    {
      name: String,
      address: String,
      rating: Number,
      pricePerNight: Number
    }
  ],
  foods: [
    {
      cuisine: String,
      recommendedRestaurants: [String]
    }
  ],
  packagePricing: {
    basePrice: Number,
    additionalFees: Number,
    discount: Number,
    finalPrice: Number
  },
  visitSites: [
    {
      name: String,
      description: String,
      distanceFromHotel: Number // in kilometers
    }
  ],
  onsiteActivities: [String],
  transportOptions: {
    toLocation: {
      type: String,
      enum: ['Flight', 'Train', 'Bus', 'Private Car', 'Other']
    },
    withinLocation: [String]
  },
  ratings: {
    overall: Number,
    categories: {
      cleanliness: Number,
      service: Number,
      location: Number,
      valueForMoney: Number
    }
  },
  reviews: [
    {
      userId: String,
      username: String,
      reviewText: String,
      rating: Number,
      date: { type: Date, default: Date.now }
    }
  ],
  description: {
    short: String,
    detailed: String
  },
  media: {
    photos: [String], // URLs of photos
    videos: [String] // URLs of videos
  },
  nearbyHotels: [
    {
      name: String,
      distance: Number,
      pricePerNight: Number,
      rating: Number
    }
  ],
  duration: {
    days: Number,
    nights: Number
  },
  recommendedAgeGroup: {
    type: String,
    enum: ['All Ages', 'Kids', 'Teens', 'Adults', 'Seniors']
  },
  bestTimeToVisit: {
    season: String,
    months: [String]
  },
  cancellationPolicy: {
    refundPercentage: Number,
    deadlineInDays: Number
  },
  availableDiscounts: {
    type: String,
    enum: ['None', 'Seasonal', 'Group', 'Loyalty']
  },
  tags: [String], // e.g., ['Scenic', 'Budget-friendly', 'Family', 'Couples']
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better performance on search queries
placeSchema.index({ name: 'text', 'locations.city': 'text', 'locations.state': 'text', tags: 'text' });

module.exports = mongoose.model('Package', placeSchema);
