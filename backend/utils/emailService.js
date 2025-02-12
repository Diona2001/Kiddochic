const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS  // Your Gmail password or app-specific password
  }
});

const sendOrderConfirmation = async (orderDetails) => {
  const {
    email,
    orderNumber,
    productName,
    size,
    price,
    shippingAddress,
    estimatedDelivery
  } = orderDetails;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order Confirmation #${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Order Confirmation</h1>
        <p style="color: #666;">Dear Customer,</p>
        <p style="color: #666;">Thank you for your order! We're pleased to confirm that your order has been received and is being processed.</p>
        
        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #333; margin-bottom: 15px;">Order Details</h2>
          <p><strong>Order Number:</strong> #${orderNumber}</p>
          <p><strong>Product:</strong> ${productName}</p>
          <p><strong>Size:</strong> ${size}</p>
          <p><strong>Price:</strong> ₹${price}</p>
          <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
        </div>

        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #333; margin-bottom: 15px;">Shipping Address</h2>
          <p>${shippingAddress}</p>
        </div>

        <p style="color: #666;">If you have any questions about your order, please contact our customer service.</p>
        
        <div style="text-align: center; margin-top: 30px; color: #888; font-size: 12px;">
          <p>This is an automated email, please do not reply.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = { sendOrderConfirmation }; 