const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
    addMaternityKit, 
    getAllMaternityKits, 
    getMaternityKitById,
    updateMaternityKit,
    deleteMaternityKit
} = require('../controller/maternityKitController');

// Configure multer for multiple file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max file size
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload images only.'), false);
        }
    }
});

// Routes
router.post('/', upload.array('images', 5), addMaternityKit);
router.get('/', getAllMaternityKits);
router.get('/:id', getMaternityKitById);
router.put('/:id', upload.array('images', 5), updateMaternityKit);
router.delete('/:id', deleteMaternityKit);

module.exports = router; 