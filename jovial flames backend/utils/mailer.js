const nodemailer = require('nodemailer');

// Configure the email transporter using your Gmail credentials from the .env file
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

/**
 * Sends an OTP email.
 * @param {string} email - The recipient's email address.
 * @param {string} otp - The One-Time Password.
 * @param {string} subject - The subject line of the email.
 */
const sendOtpMail = async (email, otp, subject) => {
  try {
    await transporter.sendMail({
      from: `"Jovial Flames" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: subject,
      text: `Your One-Time Password (OTP) is: ${otp}. It is valid for 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
          <h2>Jovial Flames Verification</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; background: #f4f4f4; padding: 10px 20px; border-radius: 5px;">
            ${otp}
          </p>
          <p>This code is valid for 10 minutes.</p>
        </div>
      `
    });
    console.log(`✅ OTP email sent successfully to ${email}`);
  } catch (error) {
    console.error(`🔴 Failed to send OTP email to ${email}:`, error);
    // Re-throw the error so the calling function knows something went wrong
    throw new Error('Failed to send OTP email.');
  }
};

module.exports = { sendOtpMail };