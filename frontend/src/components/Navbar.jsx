import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl font-bold text-orange-500">ItemCart</div>
        </div>
        <div className="flex items-center space-x-4">
          <Link to={'/items'} className="text-gray-700 hover:text-orange-500">Items</Link>
          <Link to={'/login'} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
