// server.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const placeRoutes = require('./routes/PlaceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');


const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/booking', bookingRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
