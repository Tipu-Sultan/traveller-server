const nodemailer = require('nodemailer');

  
  // Email sending function (implement this function)
  const sendVerificationEmail = async (email, token) => {
    const verificationLink = `${process.env.HOST}/verify?token=${token}`;
  
    // Use a mailing service or library to send the email
    const emailContent = `
      <h1>Email Verification</h1>
      <p>Hi,</p>
      <p>Thank you for registering. Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
    `;
  
    // Example using nodemailer (make sure to configure it)
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    await transporter.sendMail({
      to: email,
      subject: 'Email Verification',
      html: emailContent,
    });
  };
  

module.exports = sendVerificationEmail;
