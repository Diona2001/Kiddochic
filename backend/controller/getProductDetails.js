const productModel = require("../models/productModel"); // Ensure this path is correct

// Get product details by ID
const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming you're passing the productId in URL params

    // Validate if productId exists
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    // Fetch the product from the database
    const product = await productModel.findById(productId);

    // If no product found, return a 404 error
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Return the product details
    return res.status(200).json({ success: true, data: product });

  } catch (err) {
    // Handle server errors
    console.error('Error fetching product details:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getProductDetails };
