const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: { 
    type: String, 
  },
  orderId: { 
    type: String, 
  }, 
  bookingId: { 
    type: String, 
    required: true 
  }, // Reference to the booking associated with this payment
  packageId: { 
    type: String, 
    required: true 
  }, // Reference to the package associated with this payment
  method: { 
    type: String, 
  }, // Payment method (e.g., "Credit Card", "PayPal")
  description: { 
    type: String 
  }, // Description of the payment or transaction
  notes: { 
    type: String 
  }, // Any additional notes
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Reference to the user who made the payment
  email: { 
    type: String, 
  }, // User's email associated with the payment
  contact: { 
    type: String, 
  }, // User's contact information associated with the payment
  currency: { 
    type: String, 
    required: true 
  }, // Currency code (e.g., "USD", "INR")
  amount: { 
    type: Number, 
    required: true 
  }, // Payment amount in smallest currency unit
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Captured'], 
    default: 'Pending' 
  }, // Payment status
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Payment', paymentSchema);
