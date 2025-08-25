// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `px-4 py-2 font-semibold transition-colors duration-300 ${
      location.pathname === path
        ? 'text-purple-400 underline underline-offset-4'
        : 'text-gray-300 hover:text-purple-400'
    }`;

  return (
    <nav className="bg-black p-4 flex items-center justify-between shadow-md">
      {/* Small logo / SARVAT */}
      <div className="text-2xl font-bold text-purple-400">SARVAT</div>

      {/* Navbar Links */}
      <div className="flex space-x-4">
        <Link to="/" className={linkClasses('/')}>Home</Link>
        <Link to="/working" className={linkClasses('/working')}>WorkPage</Link>
        <Link to="/portfolio" className={linkClasses('/portfolio')}>Portfolio</Link>
        <Link to="/contact" className={linkClasses('/contact')}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
