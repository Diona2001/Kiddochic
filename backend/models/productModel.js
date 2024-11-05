const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // boys or girls
  subcategory: { type: String, required: true }, // e.g., 'full-length', 'party'
  description: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  discount: { type: Number, required: true }, // Percentage discount
  stock: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' ,
  }, // Added status field
  age: { type: String, required: true }, // e.g., '5-6 years', '7-8 years'
  color: { type: String, required: true }, // e.g., 'red', 'blue'
  style: { type: String, required: true }, // e.g., 'casual', 'formal'
  fabric: { type: String, required: true }, // e.g., 'cotton', 'polyester'
  sleeveLength: { type: String, required: true }, // e.g., 'full', 'half', 'sleeveless'
  neckline: { type: String, required: true }, // e.g., 'round', 'v-neck', 'collared'
}, {
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Product', productSchema);
