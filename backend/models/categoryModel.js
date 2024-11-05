const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Boy', 'Girl','Unisex'], required: true },
  imageUrl: { type: String, required: true }, // Added imageUrl
});

module.exports = mongoose.model('Category', categorySchema);
