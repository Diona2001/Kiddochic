import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 md:flex md:justify-between">
        {/* Quick Links */}
        <div className="mb-6 md:mb-0">
          <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
          <ul>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/shop" className="hover:underline">Shop</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mb-6 md:mb-0">
          <h5 className="text-lg font-semibold mb-4">Contact</h5>
          <p>123 Kids Street</p>
          <p>City, Country</p>
          <p>Email: support@kidsstore.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-400">
        &copy; {new Date().getFullYear()} Kids Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
