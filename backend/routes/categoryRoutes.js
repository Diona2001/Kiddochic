const express = require('express');
const { getCategories, addCategory, updateCategory } = require('../controller/categoryController');

const router = express.Router();

// Route for getting categories
router.get('/', getCategories); // Updated to get categories from root
//Route for adding a new category
router.post('/', addCategory);
// Route for updating an existing category by ID
router.put('/:id', updateCategory);


module.exports = router;
