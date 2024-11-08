// routes/authRoutes.js
const express = require('express');
const { PayByRazorpay,VerifyPaymentByRazorpay } = require('../controllers/PaymentController');
const router = express.Router();

router.post('/create-payment', PayByRazorpay);
router.post('/verify-payment', VerifyPaymentByRazorpay);



module.exports = router;
