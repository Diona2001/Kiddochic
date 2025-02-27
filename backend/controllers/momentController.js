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
      });
    }

    const moment = new Moment({
      userId: req.user.id,
      image: req.file.filename,
      caption: req.body.caption || ''
    });

    await moment.save();

    res.status(201).json({
      success: true,
      message: 'Moment uploaded successfully',
      data: moment
    });

  } catch (error) {
    if (req.file) {
      await fs.unlink(path.join('uploads', req.file.filename)).catch(console.error);
    }
    res.status(500).json({
      success: false,
      message: 'Error uploading moment',
      error: error.message
    });
  }
};

// Get all moments
exports.getAllMoments = async (req, res) => {
  try {
    const moments = await Moment.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'firstName lastName')
      .lean();

    const momentsWithTime = moments.map(moment => ({
      ...moment,
      timeAgo: getTimeAgo(moment.createdAt)
    }));

    res.status(200).json({
      success: true,
      data: momentsWithTime
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching moments',
      error: error.message
    });
  }
};

// Like/Unlike a moment
exports.likeMoment = async (req, res) => {
  try {
    const moment = await Moment.findById(req.params.momentId);
    
    if (!moment) {
      return res.status(404).json({
        success: false,
        message: 'Moment not found'
      });
    }

    const likeIndex = moment.likes.indexOf(req.user.id);
    if (likeIndex === -1) {
      moment.likes.push(req.user.id);
      moment.likesCount += 1;
    } else {
      moment.likes.splice(likeIndex, 1);
      moment.likesCount -= 1;
    }

    await moment.save();

    res.status(200).json({
      success: true,
      message: likeIndex === -1 ? 'Moment liked' : 'Moment unliked',
      data: moment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling like',
      error: error.message
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
        message: 'Moment not found'
      });
    }

    if (moment.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this moment'
      });
    }

    await fs.unlink(path.join('uploads', moment.image));
    await moment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Moment deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting moment',
      error: error.message
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