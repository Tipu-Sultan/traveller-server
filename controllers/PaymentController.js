const Razorpay = require('razorpay');
require('dotenv').config();
const axios = require('axios');
const Payment = require('../models/PaymentModel'); // Make sure this path is correct based on your project structure


const crypto = require('crypto');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,  // Replace with your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET,      // Replace with your Razorpay Key Secret
});

async function PayByRazorpay(req, res) {
    const { amount, currency, receipt, packageId, userId } = req.body;

    try {
        // Create a new order with Razorpay
        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency,
            receipt,
        };
        const order = await razorpayInstance.orders.create(options);

        // Store initial payment details in the Payment collection
        const paymentData = {
            orderId: order.id, // Using Razorpay's order ID as the initial payment ID
            bookingId: receipt, // Assuming receipt is bookingId
            packageId: packageId,
            method: 'Razorpay', // Assuming Razorpay is the payment method
            userId: userId,
            currency: order.currency,
            amount: order.amount,
            status: 'Pending',
        };

        const newPayment = new Payment(paymentData);
        await newPayment.save();

        res.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
            order,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).send('Internal Server Error');
    }
}


async function VerifyPaymentByRazorpay(req, res) {
    const { order_id, payment_id, signature } = req.body;

    // Generate HMAC SHA256 signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${order_id}|${payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === signature) {
        try {
            // Fetch payment details from Razorpay
            const paymentDetails = await axios.get(
                `https://api.razorpay.com/v1/payments/${payment_id}`,
                {
                    auth: {
                        username: process.env.RAZORPAY_KEY_ID,
                        password: process.env.RAZORPAY_KEY_SECRET,
                    },
                }
            );

            // Extract relevant details from paymentDetails
            const {
                id: paymentId,
                order_id: orderId,
                method,
                description,
                email,
                contact,
                bank,
                invoice_id,
            } = paymentDetails.data;

            // Update payment in the database
            await Payment.findOneAndUpdate(
                { orderId: orderId }, // Find the document by the Razorpay order ID
                {
                    paymentId: payment_id,
                    method,
                    description,
                    email,
                    contact,
                    status: 'Confirmed',
                    invoiceId: invoice_id || '--',
                    bank: bank || 'N/A',
                },
                { new: true } // Return the updated document
            );

            res.json({
                success: true,
                message: 'Payment verified and updated successfully.',
                details: {
                    paymentId,
                    orderId,
                    invoiceId: invoice_id || '--',
                    paymentMethod: `${method} (${bank || 'N/A'})`,
                    customerDetails: {
                        contact: contact || '--',
                        email: email || '--',
                    },
                    description: description || 'No description provided'
                },
            });
        } catch (error) {
            console.error('Error fetching payment details:', error);
            res.status(500).json({ success: false, message: 'Failed to retrieve payment details.' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed.' });
    }
}

module.exports ={
    PayByRazorpay,
    VerifyPaymentByRazorpay
}
