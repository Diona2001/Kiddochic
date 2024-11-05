const  express = require('express')
const cors = require ('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const categoryRoutes = require('./routes/categoryRoutes'); // Ensure the correct path
const productRoutes = require('./routes/productRoutes'); // Adjust path if needed
const cartRoutes = require('./routes/cartRoutes');

const app = express()
// Define the frontend origin
const PORT = process.env.PORT || 8080;

// CORS Configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api",router);
app.use("/api/categories", categoryRoutes); // Mount the categories routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);



connectDB().then(()=>{
    app.listen(PORT,()=>{
      console.log("Connected to DB");
      console.log(`Server is running on port ${PORT}`);
    })

})

