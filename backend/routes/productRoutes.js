const express = require('express');
const Product = require('../models/productModel'); // Ensure the path to the model is correct
const {
  addProduct,
  getProductsByCategory,
  getAllProducts,
  editProduct,
  deleteProduct,
  viewProduct,
  activateProduct, // Add this controller
  deactivateProduct, // Add this controller
} = require('../controller/productController');

const router = express.Router();

 
// Add a new product (POST /products)
router.post('/', addProduct);

// Fetch all active products (GET /products)
router.get('/', getAllProducts); // Route to get all products

// Fetch products by category and subcategory
router.get('/category/:category/:subcategory?', getProductsByCategory); 

// View a single product by ID
router.get('/:id', viewProduct);

// Edit a product
router.put('/:id', editProduct);

// Delete a product
router.delete('/:id', deleteProduct);

// Activate product route (using controller function)
router.put('/:id/activate', activateProduct);

// Deactivate product route (using controller function)
router.put('/:id/deactivate', deactivateProduct);


// Export the router
module.exports = router;
