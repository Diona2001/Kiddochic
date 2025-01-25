import React from 'react';
import SupplierRegistrationForm from '../components/supplier/SupplierRegistrationForm';

const SupplierRegistration = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Supplier Registration</h1>
      <SupplierRegistrationForm />
    </div>
  );
};

export default SupplierRegistration; 