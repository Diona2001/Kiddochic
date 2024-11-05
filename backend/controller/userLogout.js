// controller/userLogout.js
async function userLogout(req, res) {
    try {
      // Clear the "token" cookie
      res.clearCookie("token");
  
      // Send a successful response
      res.status(200).json({
        message: "Logged out successfully",
        error: false,
        success: true,
        data: []
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message || "An error occurred during logout",
        error: true,
        success: false,
      });
    }
  }
  
  module.exports = userLogout;
  