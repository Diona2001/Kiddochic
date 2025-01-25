const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  businessName: { 
    type: String, 
    required: true 
  },
  ownerName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  mobile: { 
    type: String, 
    required: true, 
    unique: true 
  },
  aadharNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  panNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  gstNumber: { 
    type: String, 
    unique: true,
    sparse: true // Allows null/undefined values to be unique
  },
  bankName: { 
    type: String, 
    required: true 
  },
  accountNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  ifscCode: { 
    type: String, 
    required: true 
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  // documents: {
  //   aadharCard: { type: String, required: true }, // URL to stored document
  //   panCard: { type: String, required: true }, // URL to stored document
  //   gstCertificate: { type: String }, // Optional for non-GST suppliers
  //   bankDetails: { type: String, required: true }, // URL to stored document
  // },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Supplier', supplierSchema); 