import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common'; // Import SummaryApi
import { Link } from 'react-router-dom';

const CharityPage = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCharity, setEditingCharity] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quality: 'normal',
    ageGroup: 'newborn',
    gender: 'unisex',
    status: 'available'
  });

  // Fetch charities when component mounts
  useEffect(() => {
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    try {
      const response = await fetch(SummaryApi.getAllCharities.url);
      const data = await response.json();
      
      if (data.success) {
        setCharities(data.data);
      } else {
        toast.error('Failed to fetch charity items');
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === 'file') {
      setSelectedImage(files[0]);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.gender) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.description.length < 10) {
      toast.error('Description should be at least 10 characters long');
      return;
    }

    if (!selectedImage && !editingCharity) {
      toast.error('Please select an image');
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    
    if (selectedImage) {
      formDataToSend.append('image', selectedImage);
    }

    try {
      const config = editingCharity 
        ? SummaryApi.updateCharity(editingCharity._id)
        : SummaryApi.addCharity;

      const response = await fetch(config.url, {
        method: config.method,
        body: formDataToSend,
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(editingCharity ? 'Charity updated successfully' : 'Charity added successfully');
        fetchCharities();
        resetForm();
      } else {
        toast.error(data.message || 'Error saving charity item');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error saving charity item');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const config = SummaryApi.deleteCharity(id);
        const response = await fetch(config.url, {
          method: config.method,
        });

        const data = await response.json();
        
        if (data.success) {
          toast.success('Charity deleted successfully');
          fetchCharities();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Error deleting charity item');
      }
    }
  };

  const handleEdit = (charity) => {
    setEditingCharity(charity);
    setFormData({
      name: charity.name,
      description: charity.description,
      quality: charity.quality,
      ageGroup: charity.ageGroup,
      gender: charity.gender,
      status: charity.status
    });
    setSelectedImage(null);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      quality: 'normal',
      ageGroup: 'newborn',
      gender: 'unisex',
      status: 'available'
    });
    setSelectedImage(null);
    setEditingCharity(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Charity Donations
        </h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
          {showAddForm ? 'Cancel' : 'Add New Charity'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-xl shadow-lg transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              accept="image/*"
              required={!editingCharity}
            />
            <select
              name="quality"
              value={formData.quality}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="poor">Poor</option>
              <option value="normal">Normal</option>
              <option value="good">Good</option>
            </select>
            <select
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="newborn">Newborn</option>
              <option value="1-3 years">1-3 years</option>
              <option value="4-6 years">4-6 years</option>
            </select>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
              <option value="unisex">Unisex</option>
            </select>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description (minimum 10 characters)"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none md:col-span-2"
              required
              minLength="10"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-md"
          >
            {editingCharity ? 'Update Charity' : 'Add Charity'}
          </button>
        </form>
      )}

      {/* Charity Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {charities.map((charity) => (
          <div key={charity._id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <Link to={`/charity/${charity._id}`} className="relative aspect-[4/3] overflow-hidden block">
              <img 
                src={`http://localhost:8080/uploads/${charity.image}`}
                alt={charity.name} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                charity.status === 'available' ? 'bg-emerald-500 text-white' :
                charity.status === 'reserved' ? 'bg-amber-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {charity.status}
              </span>
            </Link>
            
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 hover:line-clamp-none">
                {charity.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 hover:line-clamp-none">
                {charity.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  {charity.ageGroup}
                </span>
                <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                  {charity.quality}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  charity.gender === 'boy' ? 'bg-blue-50 text-blue-700' :
                  charity.gender === 'girl' ? 'bg-pink-50 text-pink-700' :
                  'bg-purple-50 text-purple-700'
                }`}>
                  {charity.gender}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(charity)}
                  className="flex-1 bg-amber-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors duration-200 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(charity._id)}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {charities.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          <p className="text-xl">No charity items found. Add some items to get started!</p>
        </div>
      )}
    </div>
  );
};

export default CharityPage; 