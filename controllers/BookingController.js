const Booking = require('../models/Booking');  // Assuming bookingSchema is in models folder

// Initial booking creation
exports.createBooking = async (req, res) => {
  try {
    const {bookingId, userId, packageId,bookingDate, travelDate, numberOfPeople,numberOfRooms,hotelName,commuteType, travelersDetails, totalCost } = req.body;

    // Create a new booking document
    const booking = new Booking({
      bookingId,
      user: userId,
      package: packageId,
      bookingDate,
      travelDate,
      numberOfPeople,
      numberOfRooms,
      hotelName,
      commuteType,
      travelersDetails,
      totalCost,
      paymentStatus: 'Pending',  // Default as 'Pending' until payment is confirmed
      bookingStatus: 'Pending',  // Initial status as 'Pending'
    });

    // Save the booking in the database
    const savedBooking = await booking.save();
    res.status(201).json({
      success: true,
      message: 'Booking created successfully. Please proceed to payment.',
      booking: savedBooking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: 'Failed to create booking.' });
  }
};

// Update booking after successful payment
exports.updateBookingAfterPayment = async (req, res) => {
  try {
    const { bookingId, paymentStatus, paymentId, signature, paymentMethod } = req.body;

    // Find the booking by ID and update the status and payment details
    const updatedBooking = await Booking.findOneAndUpdate(
        {bookingId},
      {
        paymentStatus,
        bookingStatus:paymentStatus==='Completed' ? 'Confirmed' :'Pending',
        paymentId,
        paymentMethod,
        paymentSignature: signature,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully after payment.',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error('Error updating booking after payment:', error);
    res.status(500).json({ success: false, message: 'Failed to update booking after payment.' });
  }
};


exports.getBookingDetails = async (req, res) => {
    try {
      const { bookingId } = req.params;
  
      // Find the booking by bookingId
      const booking = await Booking.findOne({ bookingId });
  
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found.' });
      }
  
      res.status(200).json({
        success: true,
        message: 'Booking details retrieved successfully.',
        booking,
      });
    } catch (error) {
      console.error('Error retrieving booking details:', error);
      res.status(500).json({ success: false, message: 'Failed to retrieve booking details.' });
    }
  };
  
