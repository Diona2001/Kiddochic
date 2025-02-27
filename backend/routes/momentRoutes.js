const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadMoment, getAllMoments, likeMoment, deleteMoment } = require('../controllers/momentController'); // Import the controller
const authToken = require('../middleware/authToken');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
});

// Protect all routes
router.use(authToken);

// Routes
router.post('/upload', upload.single('image'), uploadMoment);
router.get('/', getAllMoments);
router.post('/:momentId/like', likeMoment);
router.delete('/:momentId', deleteMoment);

module.exports = router; 