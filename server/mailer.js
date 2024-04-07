// Importing nodemailer module
const nodemailer = require('nodemailer');

// Creating a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gymbuddy.sup@gmail.com',
    pass: 'iwjl ssps qpww qywr'
  }
});

const accountCreationHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Account Creation Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

<div style="background-color: #fff; border-radius: 8px; padding: 20px;">
  <h2 style="color: #333;">Welcome to Our Platform!</h2>
  <p>Thank you for creating an account with us. Your account has been successfully created.</p>
  <p>You can now log in to our platform using the credentials you provided during registration.</p>
  <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
  <p>Best regards,<br> 
  The Gymbuddy Team</p>
</div>

</body>
</html>
`;

const accountCreationPlain = `
Welcome to Our Platform!

Thank you for creating an account with us. Your account has been successfully created.

You can now log in to our platform using the credentials you provided during registration.

If you have any questions or need assistance, please don't hesitate to contact us.

Best regards,
The Gymbuddy Team
`;



// Function to send email notifications
function sendEmail(subject, recipient) {
  // Email message options
  const mailOptions = {
    from: 'gymbuddy.sup@gmail.com', // Sender address
    to: recipient, // Recipient address
    subject: subject, // Subject line
    text: accountCreationPlain, // Plain text body
    html: accountCreationHTML // HTML content
  };

  // Sending email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Exporting the function for external use
module.exports = {
  sendEmail
};