const express = require('express');
const router = express.Router();
const addToCartController = require('../controller/addToCartController');
const authToken = require('../middleware/authToken'); // Ensure this middleware sets req.user

// Apply auth middleware to all cart routes
router.use(authToken);

// Add item to cart
router.post('/addtocart', authToken, addToCartController.addToCart);

// Remove item from cart
router.delete('/remove/:productId', authToken,addToCartController.removeFromCart);

// Update item quantity in cart
router.put('/update/:productId',authToken, addToCartController.updateCartItemQuantity);

// Get cart contents
router.get('/', authToken,addToCartController.getCart);

// Clear entire cart
router.delete('/clear',addToCartController.clearCart);

module.exports = router;