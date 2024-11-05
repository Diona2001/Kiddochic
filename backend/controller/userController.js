// controller/userController.js
const User = require('../models/userModel');

// Get current user profile
async function getUserProfile(req, res) {
  try {
    const userId = req.user.id; // Extracted from the token by authToken middleware
    const user = await User.findById(userId).select('firstName email');

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      error: false,
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error retrieving user profile",
      error: true,
      success: false,
    });
  }
}

module.exports = { getUserProfile };
