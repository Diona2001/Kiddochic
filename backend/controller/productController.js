const Product = require('../models/productModel');


// Add a new product
async function addProduct(req, res) {
  try {
    const { name, category, subcategory, description, originalPrice, discountPrice, discount, stock, imageUrl,age, color, style, fabric, sleeveLength, neckline } = req.body;

    // Validate required fields
    if (!name || !category || !subcategory || !description || !originalPrice || !discountPrice || discount === undefined || stock === undefined || !imageUrl || !age || !color || !style || !fabric || !sleeveLength || !neckline) {
      return res.status(400).json({ message: 'All fields are required', error: true });
    }

    const product = new Product({
      name,
      category,
      subcategory,
      description,
      originalPrice,
      discountPrice,
      discount,
      stock,
      imageUrl,
      status: 'inactive',  // New products start as inactive
      age,
      color,
      style,
      fabric,
      sleeveLength,
      neckline
    });

    await product.save();
    console.log(`Product added: ${product._id}`); // Log product ID
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error(`Error adding product: ${error.message}`);
    res.status(500).json({ message: 'Error adding product', error: true });
  }
}

// Fetch all active products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find({ status: 'active' });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found in the database', error: false, success: true, data: [] });
    }

    console.log('Fetched all active products');
    res.status(200).json({ message: 'Products retrieved successfully', error: false, success: true, data: products });
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ message: 'Error fetching products', error: true });
  }
}

// Fetch products by category and subcategory
async function getProductsByCategory(req, res) {
  try {
    const { category, subcategory } = req.params;

    // Build query object
    const query = { category, status: 'active' };
    if (subcategory) {
      query.subcategory = subcategory;
    }

    const products = await Product.find(query);

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category/subcategory', error: false, success: true, data: [] });
    }

    console.log(`Fetched products for category: ${category}, subcategory: ${subcategory}`);
    res.status(200).json({ message: 'Products retrieved successfully', error: false, success: true, data: products });
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ message: 'Error fetching products', error: true });
  }
}

// Activate a product
async function activateProduct(req, res) {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { status: 'active' },  // Set product to active
      { new: true }  // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found', error: true });
    }

    console.log(`Product activated: ${id}`);
    res.status(200).json({ message: 'Product activated successfully', product: updatedProduct });
  } catch (error) {
    console.error(`Error activating product: ${error.message}`);
    res.status(500).json({ message: 'Error activating product', error: true });
  }
}

// Deactivate a product
async function deactivateProduct(req, res) {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { status: 'inactive' },  // Set product to inactive
      { new: true }  // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found', error: true });
    }

    console.log(`Product deactivated: ${id}`);
    res.status(200).json({ message: 'Product deactivated successfully', product: updatedProduct });
  } catch (error) {
    console.error(`Error deactivating product: ${error.message}`);
    res.status(500).json({ message: 'Error deactivating product', error: true });
  }
}

// Edit a product
async function editProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, category, subcategory, description, originalPrice, discountPrice, discount, stock, imageUrl,age, color, style, fabric, sleeveLength, neckline } = req.body;

    // Validate required fields
    if (!name || !category || !subcategory || !description || !originalPrice || !discountPrice || discount === undefined || stock === undefined || !imageUrl || !age || !color || !style || !fabric || !sleeveLength || !neckline) {
      return res.status(400).json({ message: 'All fields are required for updating the product', error: true });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        category,
        subcategory,
        description,
        originalPrice,
        discountPrice,
        discount,
        stock,
        imageUrl,
        age,
        color,
        style,
        fabric,
        sleeveLength,
        neckline

      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found', error: true });
    }

    console.log(`Product updated: ${id}`);
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    res.status(500).json({ message: 'Error updating product', error: true });
  }
}

// Delete a product
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found', error: true });
    }

    console.log(`Product deleted: ${id}`);
    res.status(200).json({ message: 'Product deleted successfully', error: false });
  } catch (error) {
    console.error(`Error deleting product: ${error.message}`);
    res.status(500).json({ message: 'Error deleting product', error: true });
  }
}

// View a product by ID
async function viewProduct(req, res) {
  try {
    const { id } = req.params;  // Get the product ID from request parameters
    const product = await Product.findById(id);  // Fetch product by ID

    if (!product) {
      return res.status(404).json({ message: 'Product not found', error: true });
    }

    res.status(200).json({ message: 'Product retrieved successfully', data: product, error: false });
  } catch (error) {
    console.error(`Error fetching product: ${error.message}`);
    res.status(500).json({ message: 'Error fetching product', error: true });
  }
}

module.exports = {
  addProduct,
  getProductsByCategory,
  getAllProducts,
  activateProduct,
  deactivateProduct,
  editProduct,
  deleteProduct,
  viewProduct,
};
