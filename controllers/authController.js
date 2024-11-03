const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sendVerificationEmail = require('../helper/sendEmail');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Generate a verification token manually (this can be any unique string)
    const verificationToken = crypto.randomBytes(16).toString('hex');

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

     // Create a new user instance
     const user = new User({ name, email, password,token:verificationToken });
     await user.save();

    res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid email or password' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
      res.json({ token, user, message:"Login succesfully" });
  } catch (error) {
      res.status(500).json({ error: 'Login failed' });
  }
};

const fetchUserData = async (req, res) => {
  const { userId } = req.params;

  try {
      const user = await User.findOne({ _id: userId});
      if (!user) return res.status(400).json({ error: 'User not found' });

      res.json(user);
  } catch (error) {
      res.status(500).json({ error: 'Login failed' });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
      // Find user by verification token
      const user = await User.findOne({ token: token });

      if (!user) {
          return res.status(400).json({ error: 'Invalid or expired token' });
      }

      // Update user to verified
      user.isVerified = true;
      user.verificationToken = null; 
      await user.save();

      res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
      res.status(500).json({ error: 'Email verification failed' });
  }
};

module.exports = { register, login,verifyEmail,fetchUserData};
