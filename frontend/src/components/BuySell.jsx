// src/components/BuySell.jsx
import React, { useState, useContext } from 'react';
import { StockContext } from '../context/StockContext';

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
    <div className="p-4 bg-purple-950 shadow rounded my-4">
      <h2 className="text-lg font-semibold mb-2">Buy / Sell Stocks</h2>
      <input
        type="text"
        placeholder="Stock symbol"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={handleBuy} className="bg-green-500 text-white px-3 py-1 mr-2">Buy</button>
      <button onClick={handleSell} className="bg-red-500 text-white px-3 py-1">Sell</button>
    </div>
  );
};

export default BuySell;
