import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const AddMaternityKit = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    originalPrice: '',
    discountPrice: '',
    discount: '',
    type: 'Maternity Kit',
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 5) {
      toast.error('Maximum 5 images allowed');
      e.target.value = '';
      return;
    }
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append form data
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // Append images
      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await fetch(SummaryApi.addMaternityKit.url, {
        method: SummaryApi.addMaternityKit.method,
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Maternity kit added successfully!');
        // Reset form
        setFormData({
          name: '',
          description: '',
          originalPrice: '',
          discountPrice: '',
          discount: '',
          type: 'Maternity Kit',
        });
        setImages([]);
        // Reset file input
        e.target.reset();
      } else {
        throw new Error(data.message || 'Failed to add maternity kit');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error adding maternity kit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Kit</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Maternity Kit">Maternity Kit</option>
              <option value="New Born Kit">New Born Kit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Price
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Price
            </label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Percentage
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Maximum 5 images allowed</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Adding...' : 'Add Kit'}
        </button>
      </form>
    </div>
  );
};

export default AddMaternityKit; 