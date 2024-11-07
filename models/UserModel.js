// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String}, // User's contact number
  isVerified: { type: Boolean, default: false }, // Verification status
  recentVisits: [{ 
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' }, 
    visitedAt: { type: Date, default: Date.now } 
  }],
  totalExpense: { type: Number, default: 0 }, // Total expenses of the user
  token: { type: String }, // Token for authentication or verification
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});



module.exports = mongoose.model('User', userSchema);
