const mongoose = require('mongoose');

const charitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quality: {
    type: String,
    enum: ['poor', 'normal', 'good'], // Restrict values to these options
    required: true,
  },
  ageGroup: {
    type: String,
    enum: ['newborn', '1-3 years', '4-6 years'], // Define age groups
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Charity', charitySchema); 