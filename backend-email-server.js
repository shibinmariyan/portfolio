/**
 * MailerSend Email Server
 * 
 * This is a simple Node.js backend server to handle email sending via MailerSend SMTP
 * 
 * Setup Instructions:
 * 1. Install dependencies: npm install express nodemailer cors dotenv
 * 2. Create a .env file with your MailerSend credentials
 * 3. Run: node backend-email-server.js
 * 4. Deploy to a service like Heroku, Railway, Render, or Vercel (with serverless functions)
 * 
 * For production, use environment variables for credentials (don't hardcode them)
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MailerSend SMTP Configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.mailersend.net',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILERSEND_USER || 'MS_V1EG9m@test-q3enl6kq1kr42vwr.mlsender.net',
    pass: process.env.MAILERSEND_PASSWORD || 'mssp.0EX7Spx.neqvygm3j6jl0p7w.8G5QbXS'
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'Email server is running', service: 'MailerSend SMTP' });
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }

    // Email options
    const mailOptions = {
      from: {
        name: name,
        address: 'MS_V1EG9m@test-q3enl6kq1kr42vwr.mlsender.net' // Your MailerSend sender email
      },
      replyTo: email, // So you can reply directly to the sender
      to: 'shibinmariyanstanley@gmail.com', // Your email
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent:', info.messageId);
    
    res.json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`MailerSend email server running on port ${PORT}`);
  console.log(`Send POST requests to http://localhost:${PORT}/send-email`);
});

