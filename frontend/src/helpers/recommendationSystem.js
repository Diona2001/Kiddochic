// Calculate similarity score between two products
const calculateDistance = (product1, product2) => {
  try {
    // First check if products are in the same category and subcategory
    if (product1.category !== product2.category || 
        product1.subcategory !== product2.subcategory) {
      return Infinity; // Different categories/subcategories should not be recommended
    }

    // Normalize price difference (0-1 scale)
    const priceScore = Math.abs(
      Number(product1.discountPrice) - Number(product2.discountPrice)
    ) / Math.max(Number(product1.discountPrice), Number(product2.discountPrice));

    // Calculate discount similarity
    const discountScore = Math.abs(
      Number(product1.discount) - Number(product2.discount)
    ) / 100;

    // Calculate weighted distance (lower is better)
    const distance = (
      (priceScore * 0.7) +          // Price similarity: 70%
      (discountScore * 0.3)         // Discount similarity: 30%
    );

    return distance;
  } catch (error) {
    console.error('Error calculating distance:', error);
    console.log('Product 1:', product1);
    console.log('Product 2:', product2);
    return Infinity;
  }
};

// Find K nearest neighbors within same category and subcategory
const findKNearestNeighbors = (currentProduct, allProducts, k = 4) => {
  try {
    // Debug logs for input data
    console.log('Current Product Details:', {
      name: currentProduct.name,
      category: currentProduct.category,
      subcategory: currentProduct.subcategory,
      id: currentProduct._id
    });

    // Log all available subcategories
    const subcategories = [...new Set(allProducts.map(p => p.subcategory))];
    console.log('Available subcategories:', subcategories);

    // Filter products to only include:
    // 1. Same subcategory as current product
    // 2. Active products
    // 3. Not the current product
    const candidates = allProducts.filter(p => {
      const isMatch = (
        p._id !== currentProduct._id &&
        p.subcategory === currentProduct.subcategory
      );
      
      // Debug log for each potential match
      if (isMatch) {
        console.log('Found matching product:', {
          name: p.name,
          subcategory: p.subcategory,
          id: p._id
        });
      }
      
      return isMatch;
    });

    console.log('Number of candidates found:', candidates.length);

    if (candidates.length === 0) {
      console.log('No candidates found for subcategory:', currentProduct.subcategory);
      // If no exact matches, try finding products with similar subcategories
      return allProducts.filter(p => 
        p._id !== currentProduct._id &&
        p.subcategory.toLowerCase().includes('set')
      ).slice(0, k);
    }

    // Calculate distances based on price and discount
    const distances = candidates.map(product => ({
      product,
      distance: Math.abs(
        Number(product.discountPrice) - Number(currentProduct.discountPrice)
      )
    }));

    // Sort by price similarity and get top K
    const recommendations = distances
      .sort((a, b) => a.distance - b.distance)
      .slice(0, k)
      .map(item => item.product);

    console.log('Final recommendations:', recommendations.map(r => ({
      name: r.name,
      subcategory: r.subcategory,
      price: r.discountPrice
    })));

    return recommendations;

  } catch (error) {
    console.error('Error in findKNearestNeighbors:', error);
    return [];
  }
};

export { findKNearestNeighbors }; 