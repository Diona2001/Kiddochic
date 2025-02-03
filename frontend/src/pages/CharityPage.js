import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common'; // Import SummaryApi

const CharityPage = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCharity, setEditingCharity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quality: 'normal',
    ageGroup: 'newborn',
    gender: '',
    imageUrl: '',
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data before submission
    if (!formData.name || !formData.description || !formData.imageUrl || !formData.gender) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate description length
    if (formData.description.length < 10) {
      toast.error('Description should be at least 10 characters long');
      return;
    }

    // Validate image URL
    const urlPattern = /^(http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(formData.imageUrl)) {
      toast.error('Please enter a valid image URL');
      return;
    }

    try {
      const config = editingCharity 
        ? SummaryApi.updateCharity(editingCharity._id)
        : SummaryApi.addCharity;
      
      console.log('Submitting data:', formData); // Debug log

      const response = await fetch(config.url, {
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
      console.error('Error:', error); // Debug log
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
      imageUrl: charity.imageUrl,
      status: charity.status
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      quality: 'normal',
      ageGroup: 'newborn',
      gender: 'unisex',
      imageUrl: '',
      status: 'available'
    });
    setEditingCharity(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Charity Donations</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showAddForm ? 'Cancel' : 'Add New Charity'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Donor Name"
              className="p-2 border rounded"
              required
            />
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="Image URL (https://...)"
              className="p-2 border rounded"
              required
            />
            <select
              name="quality"
              value={formData.quality}
              onChange={handleInputChange}
              className="p-2 border rounded"
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
              className="p-2 border rounded"
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
              className="p-2 border rounded"
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
              className="p-2 border rounded md:col-span-2"
              required
              minLength="10"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {editingCharity ? 'Update Charity' : 'Add Charity'}
          </button>
        </form>
      )}

      {/* Charity Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charities.map((charity) => (
          <div key={charity._id} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <img 
                src={charity.imageUrl} 
                alt={charity.name} 
                className="w-full h-48 object-cover"
              />
              <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm ${
                charity.status === 'available' ? 'bg-green-500 text-white' :
                charity.status === 'reserved' ? 'bg-yellow-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {charity.status}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{charity.name}</h3>
              <p className="text-gray-600 mb-2">{charity.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {charity.ageGroup}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {charity.quality}
                </span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  charity.gender === 'boy' ? 'bg-blue-100 text-blue-800' :
                  charity.gender === 'girl' ? 'bg-pink-100 text-pink-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {charity.gender}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(charity)}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(charity._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {charities.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No charity items found. Add some items to get started!
        </div>
      )}
    </div>
  );
};

export default CharityPage; 