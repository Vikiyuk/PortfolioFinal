// src/components/Header.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      className="p-6 rounded-xl bg-gradient-to-br from-black via-purple-900 to-black shadow-lg border border-purple-700 mb-6"
      animate={{ boxShadow: ["0 0 5px #9d4edd", "0 0 20px #d39fff", "0 0 5px #9d4edd"] }}
      transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-purple-400 text-center">
         Working Page
      </h1>
      <p className="text-purple-200 text-center mt-4">
        Manage your portfolio
      </p>
    </motion.header>
  );
};

export default Header;
