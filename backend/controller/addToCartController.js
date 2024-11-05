const Cart = require('../models/Cart');
const Product = require('../models/productModel'); // Ensure this path is correct

exports.addToCart = async (req, res) => {
  console.log("Entered to add to cart backend")
  console.log(req.body)
  try {

    const { productId, quantity = 1,usertoken } = req.body;
    const user = JSON.parse(usertoken);
    const userId = user._id;
   
    console.log("id",userId)
    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        message: 'Product not found',
        success: false,
        error: true
      });
    }

    // Determine the price to use
    const price = product.discountPrice || product.originalPrice;
    if (!price) {
      return res.status(400).json({ 
        message: 'Product price is not available',
        success: false,
        error: true
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex > -1) {
      // Update quantity if product exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item if product doesn't exist in cart
      cart.items.push({
        product: productId,
        quantity: quantity,
        price: price
      });
    }

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      message: 'Product added to cart successfully',
      success: true,
      error: false,
      data: cart
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      message: 'Error adding to cart',
      error: true,
      success: false,
      errorDetails: error.message
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.query.userId;
    // // Validate the presence of userId
    // if (!userId) {
    //   return res.status(400).json({
    //     message: 'User ID is required',
    //     success: false,
    //     error: true
    //   });
    // }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ 
        message: 'Cart not found',
        success: false,
        error: true
      });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      message: 'Product removed from cart',
      success: true,
      error: false,
      data: cart
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({
      message: 'Error removing from cart',
      error: true,
      success: false,
      errorDetails: error.message
    });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.query.userId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ 
        message: 'Cart not found',
        success: false,
        error: true
      });
    }

    const cartItem = cart.items.find(item => item.product.toString() === productId);
    if (!cartItem) {
      return res.status(404).json({ 
        message: 'Product not found in cart',
        success: false,
        error: true
      });
    }

    cartItem.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      message: 'Cart updated successfully',
      success: true,
      error: false,
      data: cart
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      message: 'Error updating cart',
      error: true,
      success: false,
      errorDetails: error.message
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    // Retrieve userId from query parameters
    const userId = req.query.userId;

    // Validate the presence of userId
    if (!userId) {
      return res.status(400).json({
        message: 'User ID is required',
        success: false,
        error: true
      });
    }

    // Fetch the user's cart and populate product details
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ 
        message: 'Cart not found',
        success: false,
        error: true
      });
    }

    // Successfully return the cart data
    res.status(200).json({
      success: true,
      error: false,
      data: cart
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      message: 'Error fetching cart',
      error: true,
      success: false,
      errorDetails: error.message
    });
  }
};


exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ 
        message: 'Cart not found',
        success: false,
        error: true
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      message: 'Cart cleared successfully',
      success: true,
      error: false,
      data: cart
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      message: 'Error clearing cart',
      error: true,
      success: false,
      errorDetails: error.message
    });
  }
};

module.exports = exports;