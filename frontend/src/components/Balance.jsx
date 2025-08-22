// src/components/Balance.jsx
import React, { useContext } from 'react';
import { StockContext } from '../context/StockContext';

const Balance = () => {
    const { balance } = useContext(StockContext);
  return (
    <div className="p-4 bg-white shadow rounded my-4">
      <h2 className="text-lg font-semibold">Balance</h2>
      <p className="text-2xl">${balance}</p>
    </div>
  );
};

export default Balance;
