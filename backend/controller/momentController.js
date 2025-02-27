const Moment = require('../models/momentModel');
const fs = require('fs').promises;
const path = require('path');

// Upload a new moment
exports.uploadMoment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image',
        error: true
      });
    }

    const moment = new Moment({
      userId: req.user.id, // From auth middleware
      image: req.file.filename,
      caption: req.body.caption || ''
    });

    await moment.save();

    res.status(201).json({
      success: true,
      message: 'Moment uploaded successfully',
      error: false,
      data: moment
    });

  } catch (error) {
    // Delete uploaded file if there's an error
    if (req.file) {
      await fs.unlink(path.join('uploads', req.file.filename)).catch(console.error);
    }

    res.status(500).json({
      success: false,
      message: 'Error uploading moment',
      error: true,
      errorDetails: error.message
    });
  }
};

// Get all moments
exports.getAllMoments = async (req, res) => {
  try {
    const moments = await Moment.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate('userId', 'firstName lastName') // Get user details
      .lean(); // Convert to plain JavaScript object

    // Add formatted time for each moment
    const momentsWithTime = moments.map(moment => ({
      ...moment,
      timeAgo: getTimeAgo(moment.createdAt)
    }));

    res.status(200).json({
      success: true,
      error: false,
      data: momentsWithTime
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching moments',
      error: true,
      errorDetails: error.message
    });
  }
};

// Like/Unlike a moment
exports.toggleLike = async (req, res) => {
  try {
    const moment = await Moment.findById(req.params.momentId);
    
    if (!moment) {
      return res.status(404).json({
        success: false,
        message: 'Moment not found',
        error: true
      });
    }

    const userId = req.user.id;
    const likeIndex = moment.likes.indexOf(userId);

    if (likeIndex === -1) {
      // Like the moment
      moment.likes.push(userId);
      moment.likesCount += 1;
    } else {
      // Unlike the moment
      moment.likes.splice(likeIndex, 1);
      moment.likesCount -= 1;
    }

    await moment.save();

    res.status(200).json({
      success: true,
      message: likeIndex === -1 ? 'Moment liked' : 'Moment unliked',
      error: false,
      data: moment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling like',
      error: true,
      errorDetails: error.message
    });
  }
};

// Delete a moment
exports.deleteMoment = async (req, res) => {
  try {
    const moment = await Moment.findById(req.params.momentId);

    if (!moment) {
      return res.status(404).json({
        success: false,
        message: 'Moment not found',
        error: true
      });
    }

    // Check if user owns the moment
    if (moment.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this moment',
        error: true
      });
    }

    // Delete image file
    await fs.unlink(path.join('uploads', moment.image));
    
    await moment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Moment deleted successfully',
      error: false
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting moment',
      error: true,
      errorDetails: error.message
    });
  }
};

// Helper function to format time ago
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
}

module.exports = exports; 