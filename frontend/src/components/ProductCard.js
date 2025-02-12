import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/products/${product._id}`} className="block">
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="aspect-w-1 aspect-h-1 mb-4">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <h3 className="text-sm text-gray-800 font-medium mb-2 line-clamp-2">
                    {product.name}
                </h3>
                <div className="flex items-baseline mb-2">
                    <span className="text-lg font-medium">₹{product.discountPrice}</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{product.subcategory}</span>
                    <span className="text-sm text-green-600">-{product.discount}%</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
