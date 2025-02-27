import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context';
import SummaryApi from '../common';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Moments = () => {
  // Define state variables
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) {
      toast.error('Please login to view moments');
      navigate('/login');
      return;
    }
    fetchMoments();
  }, [auth?.token, navigate]);

  const fetchMoments = async () => {
    if (!auth?.token) return;

    try {
      setLoading(true);
      const response = await fetch(SummaryApi.getAllMoments.url, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch moments');
      }

      const data = await response.json();
      if (data.success) {
        setMoments(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch moments');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth?.token) {
      toast.error('Please login to share moments');
      return;
    }

    if (!image) {
      toast.error('Please select an image');
      return;
    }

    setUploadLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('caption', caption);

      const response = await fetch(SummaryApi.uploadMoment.url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload moment');
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Moment shared successfully!');
        setImage(null);
        setPreviewUrl('');
        setCaption('');
        fetchMoments();
      } else {
        throw new Error(data.message || 'Failed to upload moment');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleLike = async (momentId) => {
    if (!auth?.token) {
      toast.error('Please login to like moments');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(SummaryApi.likeMoment(momentId).url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to like moment');
      }

      const data = await response.json();
      if (data.success) {
        setMoments(moments.map(moment => 
          moment._id === momentId 
            ? { 
                ...moment, 
                likes: data.data.likes,
                likesCount: data.data.likesCount 
              } 
            : moment
        ));
      } else {
        throw new Error(data.message || 'Failed to like moment');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (momentId) => {
    if (!auth?.token) {
      toast.error('Please login to delete moments');
      return;
    }

    try {
      const response = await fetch(SummaryApi.deleteMoment(momentId).url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete moment');
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Moment deleted successfully!');
        fetchMoments();
      } else {
        throw new Error(data.message || 'Failed to delete moment');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Share Moment Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Share Your Moment</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium">Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700
                    hover:file:bg-purple-100"
                />
              </label>

              {previewUrl && (
                <div className="mt-4">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full max-h-96 object-cover rounded-lg"
                  />
                </div>
              )}

              <label className="block">
                <span className="text-gray-700 font-medium">Caption</span>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  rows="3"
                  placeholder="Write a caption..."
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={uploadLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold
                hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                transform transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadLoading ? 'Sharing...' : 'Share Moment'}
            </button>
          </form>
        </div>

        {/* Moments Feed */}
        <div className="space-y-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            </div>
          ) : moments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No moments shared yet. Be the first to share!</p>
            </div>
          ) : (
            moments.map((moment) => (
              <div key={moment._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={`http://localhost:8080/uploads/${moment.image}`}
                  alt="Moment"
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Found';
                  }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800">
                        {moment.userId?.firstName} {moment.userId?.lastName}
                      </span>
                      <span className="text-gray-500 text-sm">
                        • {moment.timeAgo || 'Just now'}
                      </span>
                    </div>
                    {moment.userId?._id === auth?.userId && (
                      <button
                        onClick={() => handleDelete(moment._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete moment"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{moment.caption}</p>
                  
                  {/* Like Button and Count */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleLike(moment._id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      {moment.likes?.includes(auth?.userId) ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
                      <span>{moment.likesCount || 0} likes</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Moments; 