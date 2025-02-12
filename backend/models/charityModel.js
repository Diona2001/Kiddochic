const mongoose = require('mongoose');

const charitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide donor name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide item description'],
        trim: true,
        minLength: [10, 'Description should be at least 10 characters long']
    },
    quality: {
        type: String,
        required: [true, 'Please specify item quality'],
        enum: {
            values: ['poor', 'normal', 'good'],
            message: 'Quality must be either: poor, normal, or good'
        }
    },
    ageGroup: {
        type: String,
        required: [true, 'Please specify age group'],
        enum: {
            values: ['newborn', '1-3 years', '4-6 years'],
            message: 'Please select a valid age group'
        }
    },
    gender: {
        type: String,
        required: [true, 'Please specify gender'],
        enum: {
            values: ['boy', 'girl', 'unisex'],
            message: 'Gender must be either: boy, girl, or unisex'
        }
    },
    image: {
        type: String,
        required: [true, 'Please provide an image of the items']
    },
    status: {
        type: String,
        enum: ['available', 'reserved', 'donated'],
        default: 'available'
    }
}, {
    timestamps: true
});

// Index for better search performance
charitySchema.index({ name: 1, status: 1 });

const Charity = mongoose.model('Charity', charitySchema);

module.exports = Charity; 