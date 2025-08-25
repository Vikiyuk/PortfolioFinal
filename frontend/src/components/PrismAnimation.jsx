import React from 'react';
import { motion } from 'framer-motion';
import './PrismAnimation.css';

const PrismAnimation = () => {
  return (
    <div className="prism-container">
      <motion.div
        className="tri-prism"
        animate={{ rotateY: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      >
        {/* Light beams with gradient and glow */}
        <div className="light-beam red"></div>
        <div className="light-beam orange"></div>
        <div className="light-beam yellow"></div>
        <div className="light-beam green"></div>
        <div className="light-beam blue"></div>
        <div className="light-beam purple"></div>
      </motion.div>
    </div>
  );
};

export default PrismAnimation;
