import React, { useContext } from 'react';
import { StockContext } from '../context/StockContext';
import { motion } from 'framer-motion';

const Balance = () => {
  const { balance } = useContext(StockContext);

  return (
    <motion.div
      className="p-6 bg-gradient-to-br from-black via-purple-900 to-black rounded-xl shadow-md border border-purple-700"
      animate={{ boxShadow: ["0 0 3px #9d4edd", "0 0 10px #a855f7", "0 0 3px #9d4edd"] }}
      transition={{ repeat: Infinity, duration: 3, repeatType: "mirror" }}
    >
      <h2 className="text-xl font-semibold text-purple-400 mb-3">Balance</h2>
      <p className="text-3xl font-bold text-purple-200">${balance}</p>
    </motion.div>
  );
};

export default Balance;
