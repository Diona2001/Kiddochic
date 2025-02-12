import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CharityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharityDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/charity/${id}`);
        const data = await response.json();
        
        if (data.success) {
          console.log('Charity data:', data.data); // Debug log
          setCharity(data.data);
        } else {
          toast.error('Failed to fetch charity details');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };

    fetchCharityDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!charity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Charity item not found</h1>
        <button
          onClick={() => navigate('/charity')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Charity List
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2">
              <div className="relative aspect-square">
                <img
                  src={`http://localhost:8080/uploads/${charity.image}`}
                  alt={charity.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image load error:', e);
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                  }}
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{charity.name}</h1>
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  charity.status === 'available' ? 'bg-green-100 text-green-800' :
                  charity.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {charity.status}
                </span>
              </div>

              <p className="text-gray-600 mb-6">{charity.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm text-gray-500">Age Group</span>
                  <p className="font-semibold text-gray-800">{charity.ageGroup}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm text-gray-500">Quality</span>
                  <p className="font-semibold text-gray-800">{charity.quality}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm text-gray-500">Gender</span>
                  <p className="font-semibold text-gray-800">{charity.gender}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm text-gray-500">Added On</span>
                  <p className="font-semibold text-gray-800">
                    {new Date(charity.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => navigate(`/charity/${id}/shipping`)}
                  disabled={charity.status !== 'available'}
                  className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-200 
                    ${charity.status === 'available' 
                      ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' 
                      : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  {charity.status === 'available' ? 'Buy Now' : 'Not Available'}
                </button>

                <button
                  onClick={() => navigate('/charity')}
                  className="w-full py-3 px-6 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Back to Charity List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityDetailPage; 