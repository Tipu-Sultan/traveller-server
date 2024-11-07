const express = require('express');
const { createBooking, updateBookingAfterPayment, getBookingDetails } = require('../controllers/BookingController');
const router = express.Router();

router.post('/create-booking', createBooking);
router.put('/update-booking', updateBookingAfterPayment);
router.get('/get-booking/:bookingId', getBookingDetails);




module.exports = router;
