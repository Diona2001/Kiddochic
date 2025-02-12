// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { FiBox, FiDollarSign, FiUsers, FiShoppingCart, FiTruck, FiClock, FiAlertCircle } from 'react-icons/fi';
import AddProduct from '../components/AddProduct';
import ProductList from '../components/ProductList';
import EditProduct from '../components/EditProduct';

const AdminDashboard = () => {
  const [view, setView] = useState('dashboard');
  const [editProductId, setEditProductId] = useState(null);

  const handleEdit = (productId) => {
    setEditProductId(productId);
    setView('edit');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="space-y-2">
          {['dashboard', 'add', 'list', 'orders', 'users'].map((item) => (
            <button 
              key={item}
              onClick={() => setView(item)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                view === item ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {view === 'dashboard' && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FiBox className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Total Products</p>
                    <p className="text-2xl font-bold text-gray-800">2,543</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FiDollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-800">$45,231</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FiUsers className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Active Users</p>
                    <p className="text-2xl font-bold text-gray-800">1,325</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <FiShoppingCart className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-800">842</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[1, 2, 3, 4, 5].map((order) => (
                  <div key={order} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FiShoppingCart className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Order #{order}234</p>
                          <p className="text-sm text-gray-500">2 items • $156.00</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                        Delivered
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Notifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <FiTruck className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="font-medium text-gray-800">Update Shipping</p>
                    <p className="text-sm text-gray-500">Manage deliveries</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <FiClock className="w-6 h-6 text-purple-600 mb-2" />
                    <p className="font-medium text-gray-800">Schedule Sale</p>
                    <p className="text-sm text-gray-500">Plan promotions</p>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Notifications</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {[1, 2, 3].map((notification) => (
                    <div key={notification} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <FiAlertCircle className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">New order received</p>
                          <p className="text-xs text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {view === 'add' && <AddProduct />}
        {view === 'list' && <ProductList onEdit={handleEdit} />}
        {view === 'edit' && editProductId && (
          <div>
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transform hover:scale-105 transition-all duration-200 shadow-md mb-6 font-medium"
              onClick={() => setView('list')}
            >
              Back to Product List
            </button>
            <EditProduct productId={editProductId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
