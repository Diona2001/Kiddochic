const mongoose = require('mongoose');

const maternityKitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discountPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    images: [{
        type: String,
        required: true
    }],
    type: {
        type: String,
        required: true,
        enum: ['Maternity Kit', 'New Born Kit']
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MaternityKit', maternityKitSchema); 