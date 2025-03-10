const express = require('express')
const cors = require ('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const categoryRoutes = require('./routes/categoryRoutes'); // Ensure the correct path
const productRoutes = require('./routes/productRoutes'); // Adjust path if needed
const cartRoutes = require('./routes/cartRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const charityRoutes = require('./routes/charityRoutes');
const maternityKitRoutes = require('./routes/maternityKitRoutes');
const momentRoutes = require('./routes/momentRoutes');

const app = express()
// Define the frontend origin
const PORT = process.env.PORT || 8080;

// CORS Configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    exposedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api",router);
app.use("/api/categories", categoryRoutes); // Mount the categories routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/charity', charityRoutes);
app.use('/api/maternity-kits', maternityKitRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/moments', momentRoutes);

// Simple chatbot endpoint
app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;

  // Simple logic for chatbot response
  let botReply = 'I am not sure how to respond to that.';
  if (userMessage.toLowerCase().includes('hello')) {
    botReply = 'Hello! How can I assist you today?';
  } else if (userMessage.toLowerCase().includes('help')) {
    botReply = 'Sure! What do you need help with?';
  }

  res.json({ reply: botReply });
});

connectDB().then(()=>{
    app.listen(PORT,()=>{
      console.log("Connected to DB");
      console.log(`Server is running on port ${PORT}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy. Trying ${PORT + 1}...`);
        app.listen(PORT + 1);
      } else {
        console.error('Server error:', err);
      }
    })

})

