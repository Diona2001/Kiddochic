const productModel = require('../models/productModel');  // Import product model

const SearchProduct = async (req, res) => {
  try {
    const query = req.query.q;  // Get the search term from query parameters

    if (!query) {
      return res.status(400).json({ message: 'Search term is required', error: true });
    }

    // Create a case-insensitive regex from the search query
    const regex = new RegExp(query, 'i');

    // Find products where name, category, or subcategory matches the search term
    const products = await productModel.find({
      "$or": [
        { name: regex },
        { category: regex },
        { subcategory: regex }
      ],
      status: 'active'  // Only search for active products
    });

    // If no products found
    if (products.length === 0) {
      return res.status(404).json({ message: 'No matching products found', error: false, data: [] });
    }

    // Send back the found products
    return res.status(200).json({ message: 'Products retrieved successfully', data: products });

  } catch (error) {
    // Catch and send any errors during the process
    console.error(`Error searching products: ${error.message}`);
    return res.status(500).json({ message: 'Error searching products', error: true });
  }
};

module.exports = SearchProduct;  // Export the search function
