const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  bookingId:{
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  travelDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: 1,
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  hotelName: {
    type: String,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  commuteType: {
    type: String,
    enum: ['flight', 'on your own', 'none'],
    default: 'none',
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',  // Payment is pending before booking is confirmed
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Debit Card', 'RazorPay', 'Net Banking'],
    required: true,
    default: 'RazorPay'
  },
  bookingStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending',  // Booking is in a pending state
  },
  paymentId: {
    type: String,
  },
  paymentSignature: {
    type: String,
  },
  specialRequests: {
    type: String,
  },
  cancellationPolicy: {
    type: String,
  },
  travelersDetails: {
    name: {
      type: String,
      required: true,  // Capturing the name of the traveler
    },
    email: {
      type: String,
      required: true,  // Capturing the email of the traveler
    },
    contact: {
      type: String,
      required: true,  // Capturing the contact number of the traveler
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
  },
  contactDetails: {
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
