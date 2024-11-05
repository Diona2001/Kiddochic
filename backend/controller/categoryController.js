const Category = require('../models/categoryModel');

// Get all categories
async function getCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json({
      message: "Categories retrieved successfully",
      error: false,
      success: true,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error retrieving categories",
      error: true,
      success: false,
    });
  }
}

// Add a new category
async function addCategory(req, res) {
  try {
    const { name, gender, imageUrl } = req.body;

    // Validate input fields
    if (!name || !gender || !imageUrl) {
      return res.status(400).json({
        message: "Please provide name, gender, and imageUrl",
        error: true,
        success: false,
      });
    }

    // Create a new category
    const newCategory = new Category({ name, gender, imageUrl });
    await newCategory.save();

    res.status(201).json({
      message: "Category added successfully",
      error: false,
      success: true,
      data: newCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error adding category",
      error: true,
      success: false,
    });
  }
}

// Update a category by ID
async function updateCategory(req, res) {
  try {
    const { id } = req.params; // Get category ID from request params
    const { name, gender, imageUrl } = req.body; // Get updated fields from request body

    // Validate input fields
    if (!name || !gender || !imageUrl) {
      return res.status(400).json({
        message: "Please provide name, gender, and imageUrl",
        error: true,
        success: false,
      });
    }

    // Find the category by ID and update it
    const updatedCategory = await Category.findByIdAndUpdate(
      id, // The ID of the category to update
      { name, gender, imageUrl }, // Fields to update
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    // If category not found, return 404
    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      error: false,
      success: true,
      data: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error updating category",
      error: true,
      success: false,
    });
  }
}


module.exports = { getCategories, addCategory, updateCategory };
