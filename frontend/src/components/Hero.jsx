// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import PrismAnimation from './PrismAnimation';

const Hero = ({ navigate }) => (
  <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 border-b border-gray-700">
    {/* Left side: Title + Subtitle + Button */}
    <div className="md:w-1/2 space-y-6">
      <motion.h1
        className="text-5xl font-bold text-purple-400"
        animate={{ textShadow: "0 0 30px #9d4edd" }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.5 }}
      >
        SARVAT
      </motion.h1>
      <p className="text-gray-300 text-lg">
        Invest smartly, track trends, and maximize your gains with Sarvat.
      </p>
      <motion.button
        className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 px-6 py-2 rounded-lg font-bold text-purple-100 shadow-lg"
        animate={{ boxShadow: ["0 0 5px #9d4edd", "0 0 20px #d39fff", "0 0 5px #9d4edd"] }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/working")}
      >
        Get Started
      </motion.button>
    </div>

    {/* Right side: Prism animation */}
    <div className="md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
      <div className="w-full h-96">
        <PrismAnimation />
      </div>
    </div>
  </div>
);

export default Hero;
