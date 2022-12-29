import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-purple-700 shadow-md py-2">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold text-white hover:text-gray-100">
            My Portfolio
          </a>
        </div>
        <div className="flex items-center">
          <a href="#" className="btn py-2 px-4 text-white hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple">
            Home
          </a>
          <a href="#" className="btn py-2 px-4 text-white hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple">
            About
          </a>
          <a href="#" className="btn py-2 px-4 text-white hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple">
            Projects
          </a>
          <a href="#" className="btn py-2 px-4 text-white hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
