import React, { useState, useContext } from 'react';
import { StockContext } from '../context/StockContext';
import { motion } from 'framer-motion';

const BuySell = () => {
  const [stock, setStock] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const { buyStock, sellStock } = useContext(StockContext);

  const handleBuy = () => {
    alert(`Bought ${amount} of ${stock}`);
  };

  const handleSell = () => {
    alert(`Sold ${amount} of ${stock}`);
  };

  return (
    <motion.div
      className="p-6 bg-gradient-to-br from-black via-purple-900 to-black rounded-xl shadow-md border border-purple-700"
      animate={{ boxShadow: ["0 0 3px #9d4edd", "0 0 10px #a855f7", "0 0 3px #9d4edd"] }}
      transition={{ repeat: Infinity, duration: 3, repeatType: "mirror" }}
    >
      <h2 className="text-xl font-semibold text-purple-400 mb-4">Buy / Sell Stocks</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Stock symbol"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="bg-black text-white border border-purple-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-black text-white border border-purple-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="number"
          placeholder="Price (optional)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="bg-black text-white border border-purple-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className="flex gap-2">
        <motion.button
          onClick={handleBuy}
          className="bg-gradient-to-r from-green-600 to-green-400 text-white px-4 py-1 rounded-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buy
        </motion.button>
        <motion.button
          onClick={handleSell}
          className="bg-gradient-to-r from-red-600 to-red-400 text-white px-4 py-1 rounded-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sell
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BuySell;
