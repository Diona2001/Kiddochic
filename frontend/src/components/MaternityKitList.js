import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import SummaryApi from '../common';

const MaternityKitList = ({ onEdit }) => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKits();
  }, []);

  const fetchKits = async () => {
    try {
      const response = await fetch(SummaryApi.getAllMaternityKits.url);
      const data = await response.json();

      if (data.success) {
        setKits(data.data);
      } else {
        toast.error('Error fetching kits');
      }
    } catch (error) {
      toast.error('Error fetching kits');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this kit?')) {
      try {
        const response = await fetch(SummaryApi.deleteMaternityKit(id).url, {
          method: SummaryApi.deleteMaternityKit(id).method,
        });
        const data = await response.json();

        if (data.success) {
          toast.success('Kit deleted successfully');
          fetchKits(); // Refresh the list
        } else {
          toast.error(data.message || 'Error deleting kit');
        }
      } catch (error) {
        toast.error('Error deleting kit');
        console.error(error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold">Maternity & New Born Kits</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Images
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {kits.map((kit) => (
              <tr key={kit._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {kit.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{kit.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    Original: ₹{kit.originalPrice}
                  </div>
                  <div className="text-sm text-gray-500">
                    Discounted: ₹{kit.discountPrice}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{kit.discount}%</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs overflow-hidden text-ellipsis">
                    {kit.description}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {kit.images.map((image, index) => (
                      <img
                        key={index}
                        src={`/uploads/${image}`}
                        alt={`${kit.name} - ${index + 1}`}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit(kit._id)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                    title="Edit"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(kit._id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {kits.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No maternity kits found
        </div>
      )}
    </div>
  );
};

export default MaternityKitList; 