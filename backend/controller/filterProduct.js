const Product = require("../models/productModel");

// controller/filterProduct.js
const filterProductController = async (req, res) => {
  try {
      const { category, subcategory, price, discount, age, color, style, fabric, sleeveLength, neckline } = req.query;
      
      let query = { status: 'active' };  // Only show active products

      if (category) query.category = category;
      if (subcategory) query.subcategory = subcategory;
      if (price) query.discountPrice = { $lte: Number(price) };
      if (discount) query.discount = { $lte: Number(discount) };
      if (age) query.age = age;
      if (color) query.color = color;
      if (style) query.style = style;
      if (fabric) query.fabric = fabric;
      if (sleeveLength) query.sleeveLength = sleeveLength;
      if (neckline) query.neckline = neckline;

      const products = await Product.find(query);

      if (!products.length) {
          return res.status(404).json({ message: 'No products found' });
      }

      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = filterProductController;
