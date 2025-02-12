const express = require('express');
const cors = require('cors');
const path = require('path');

// ... other imports ...

const app = express();

// CORS configuration
app.use(cors());

// Serve static files - make uploads directory publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 