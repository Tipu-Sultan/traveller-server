const Razorpay = require('razorpay');
require('dotenv').config();
const axios = require('axios');

const crypto = require('crypto');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,  // Replace with your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET,      // Replace with your Razorpay Key Secret
});

async function PayByRazorpay(req, res) {
    const { amount, currency, receipt } = req.body;

    try {
        // Create a new order
        const options = {
            amount: amount * 100,
            currency,
            receipt,
        };
        const order = await razorpayInstance.orders.create(options);

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
};

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
                notes,
                customer_id,
                email,
                contact,
                fee_bearer,
                app_name,
                app_id,
                bank,
                invoice_id,
            } = paymentDetails.data;

            res.json({
                success: true,
                message: 'Payment verified successfully.',
                details: {
                    paymentId,
                    orderId,
                    invoiceId: invoice_id || '--',
                    paymentMethod: `${method} (${bank || 'N/A'})`,
                    customerDetails: {
                        contact: contact || '--',
                        email: email || '--',
                    },
                    feeBearer: fee_bearer === 'payer' ? 'You pay the Razorpay platform fee' : 'Razorpay pays the platform fee',
                    appName: app_name || '--',
                    appId: app_id || '--',
                    description: description || 'No description provided',
                    notes: notes || { address: 'No address provided' },
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
